class Api::GamesController < ApplicationController
  skip_before_action :authenticate_by_token, except: [:create, :update, :destroy]
  before_action :check_admin, only: [:create, :update, :destroy]

  def index

    items_per_page = params[:items_per_page].to_i
    page_number = params[:page_number].to_i
    limit = items_per_page
    offset = (page_number-1) * items_per_page
    includes = [:tournament, :round, team1:  [:player1, :player2],
                                     team2:  [:player1, :player2],
                                     winner: [:player1, :player2]]


    query = Game
    if params[:tournament_id]
      query = query.where(tournament_id: params[:tournament_id])
    end
    if params[:round_id]
      query =  query.where(round_id: params[:round_id])
    end
    if params[:user_id]
      query = query.joins('inner join teams as t1 on t1.id = games.team1_id')
                  .joins('inner join teams as t2 on t1.id = games.team2_id')
                  .where('t1.player1_id = :id
                      or t1.player2_id = :id
                      or t2.player1_id = :id
                      or t2.player2_id =:id', id: params[:user_id])
    end
    if params[:search]
      query = query.joins('inner join teams as t1 on t1.id = games.team1_id')
                  .joins('left join users as t1p1 on t1p1.id = t1.player1_id')
                  .joins('left join users as t1p2 on t1p2.id = t1.player2_id')
                  .joins('inner join teams as t2 on t2.id = games.team2_id')
                  .joins('left join users as t2p1 on t2p1.id = t2.player1_id')
                  .joins('left join users as t2p2 on t2p2.id = t2.player2_id')
                  .where('t1p1.full_name like   :search
                          or t1p2.full_name like :search
                          or t2p1.full_name like :search
                          or t2p2.full_name like :search', search: "%#{params[:search]}%")

    end
    if params[:status]
      finished = params[:status] == GAME::STATUSES::FINISHED ? true : false
      query = query.where(finished: finished)
    end
    games = query.limit(limit).offset(offset).includes(includes).all.order(:id)
    count = query.count

    render json: { games: ActiveModel::ArraySerializer.new(games),
                   total_count: count}

  end

  def update
    game = Game.find(update_params[:id])

    if update_params[:winner]
      winner = Team.find(update_params[:winner][:id])
      loser = winner == game.team1 ? game.team2 : game.team1
    else
      winner, loser = nil
    end

    if game.update_attributes(score: update_params[:score],
                              winner: winner,
                              loser: loser,
                              finished: update_params[:finished])
      render json: game.round, status: :ok
    else
      render_error game
    end
  end

  def update_params
    params.require(:game)
  end
end
