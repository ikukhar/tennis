class Api::TournamentsController < ApplicationController

  def index
    respond_with Tournament
                  .includes(:rounds)
                  .all
                  .to_json(:include => [:rounds])
  end

  def create
    @tournament = Tournament.new(tournament_params)
    if @tournament.save
      respond_with :api, @tournament
    else
      render_error @tournament
    end
  end

  def show
    @tournament = Tournament
                    .includes(:rounds)
                    .find(params[:id])
                    .to_json(:include => [:rounds])
    if @tournament
      respond_with :api, @tournament
    else
      render_error 'Tournament not found'
    end
  end

  def update
    @tournament = Tournament.find(params[:id])
    if @tournament.update_attributes(tournament_params)
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

  def tournament_params
    params.require(:tournament).permit(:name, :form, :start,
        :rounds_attributes => [:form, :match_sets, :point_per_win])
  end

  def rounds_params
    params.require(:rounds)
  end
end
