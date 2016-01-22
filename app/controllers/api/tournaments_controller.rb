class Api::TournamentsController < ApplicationController
  def index
    respond_with Tournament.includes(:winner).all
  end

  def create
    @tournament = Tournament.create_tournament(create_params)
    if @tournament.errors.size == 0
      respond_with :api, @tournament
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
