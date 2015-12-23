class TournamentsController < ApplicationController

  def index
    respond_with Tournament.all
  end

  def new
    #code
  end
end
