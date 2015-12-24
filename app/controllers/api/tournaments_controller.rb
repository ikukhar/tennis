class Api::TournamentsController < ApplicationController

  def index
    respond_with Tournament.all
  end

  def create
    puts '------------------------------'
    puts tournament_params
    puts '------------------------------'
    @tournament = Tournament.new(tournament_params)
    if @tournament.save
      respond_with :api, @tournament
    else
      respond_with @project.errors, status: :unprocessable_entity
    end
  end

  private

  def tournament_params
    params.require(:tournament).permit(:name, :form, :start, :rounds_attributes => [:form, :match_sets, :point_per_win])
      # .merge(:rounds_attributes => params.require(:rounds))
  end

  def rounds_params
    params.require(:rounds)
  end
end
