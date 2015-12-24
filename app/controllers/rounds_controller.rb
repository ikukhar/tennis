class RoundsController < ApplicationController

  def index
    respond_with Round.where(tournament_id: params[:tournament_id])
  end

  def new
    #code
  end
end
