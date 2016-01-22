class Api::GamesController < ApplicationController
  # TODO: Убрать в контроллерах лишние экшены
  def index
    if params[:tournament_id]
      games = Game
              .includes(:tournament, :round, team1: [:player1, :player2], team2: [:player1, :player2])
              .where(tournament_id: params[:tournament_id])
    elsif params[:round_id]
      games = Game
              .includes(:tournament, :round, team1: [:player1, :player2], team2: [:player1, :player2])
              .where(round_id: params[:round_id])
    else
      games = Game
              .includes(:tournament, :round, team1: [:player1, :player2], team2: [:player1, :player2])
              .all
    end

    # games = Game
    #         .includes(:tournament, :round, team1: [:player1, :player2], team2: [:player1, :player2])
    #         .where(condition)
    render json: games
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
