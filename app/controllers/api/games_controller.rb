class Api::GamesController < ApplicationController
  def index
     render json: Game
      .includes(:round, team1: [:player1, :player2], team2: [:player1, :player2])
      .where('round_id IN (SELECT rounds.id
                           FROM rounds
                           WHERE rounds.tournament_id = ?)', params[:tournament_id])
  end

  def update
    puts '!!!!!!!!'
  end
end
