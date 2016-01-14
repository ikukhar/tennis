class Api::TournamentsController < ApplicationController

  def index
    respond_with Tournament.all.to_json
  end

  def create
    if Tournament.create_tournament(create_params)
      render nothing: true, status: :ok
    else
      render_error @tournament
    end
  end

  def show
    @tournament = Tournament.find(params[:id])
    if @tournament
      respond_with :api, @tournament
    else
      render_error 'Tournament not found'
    end
  end

  def update
    @tournament = Tournament.find(params[:id])
    if @tournament.update_attributes(update_params)
      respond_with :api, @tournament
    else
      render_error @tournament
    end
  end

  def destroy
    @tournament = Tournament.find(params[:id])
    if @tournament.destroy
      head :no_content
    else
      render_error @tournament
    end
  end

  def players
    render json: Player.includes(:user).where(tournament_id: params[:id]).to_json(include: [:user])
  end

  def create_players
    begin
      user_ids = params[:tournament][:users].map{ |h| h[:id] }
      tournament = Tournament.find(params[:id])
      tournament.players.where("user_id NOT IN (?)", user_ids).destroy_all
      user_ids.each do |id|
        tournament.players.find_or_create_by(user_id: id)
      end
      render nothing: true, status: :ok
    rescue Exception => e
      render_error e
    end
  end

  def rounds
    render json: Round.where(tournament_id: params[:id]).to_json
  end

  private

  def create_params
    params[:tournament]
    # params.require(:tournament).permit(data: [tournament: [:name, :mode, :status],
    #                                           rounds: [:match_sets, :mode],
    #                                           teams: [:players],
    #                                           games: [:rouns, :stage, :tean1, :team2])
  end

  def update_params
    params.require(:tournament).permit(:name, :mode, :status)
  end

  def rounds_params
    params.require(:rounds)
  end
end
