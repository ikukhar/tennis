class Api::TournamentsController < ApplicationController

  def index
    respond_with Tournament.all
  end

  def create
    @tournament = Tournament.new(tournament_params)
    if @tournament.save
      # TODO: Не отдавать объекты, а один только статус???
      respond_with :api, @tournament
    else
      respond_with @tournament.errors, status: :unprocessable_entity
    end
  end

  def show
    @tournament = Tournament.find(params[:id])
    if @tournament
      respond_with :api, @tournament
    else
      respond_with 'Not found', status: :unprocessable_entity
    end
  end

  def update
    @tournament = Tournament.find(params[:id])
    if @tournament.update_attributes(tournament_params)
      respond_with :api, @tournament
    else
      respond_with 'Not found', status: :unprocessable_entity
    end
  end

  def destroy
    @tournament = Tournament.find(params[:id])
    if @tournament.destroy
      head :no_content
    else
      respond_with @tournament.errors, status: :unprocessable_entity
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
