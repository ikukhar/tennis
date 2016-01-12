class Api::RoundsController < ApplicationController

  def index
    respond_with :api, Round.find_by_tournament_id(params[:tournament_id])
  end

  def new
    #code
  end
end
