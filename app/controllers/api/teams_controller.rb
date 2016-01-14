class Api::TeamsController < ApplicationController

  def index
    respond_with :api, Team.includes(:player1, :player2)
                        .where(tournament_id: params[:tournament_id])
  end

  def update
    puts '!!!!!!!!'
  end

end
