class Api::PlayersController < ApplicationController

  def index
    respond_with :api, Player.all
  end

  def update
    puts '!!!!!!!!'
  end

end
