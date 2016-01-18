class Api::GamesController < ApplicationController
  def index
     render json: Game
      .includes(:round, team1: [:player1, :player2], team2: [:player1, :player2])
      .where('round_id IN (SELECT rounds.id
                           FROM rounds
                           WHERE rounds.tournament_id = ?)', params[:tournament_id])
  end

  def update
    game = Game.find(update_params[:id])
    if game.update_attributes(score: update_params[:score],
                              winner_id: update_params[:winner][:id],
                              completed: update_params[:completed])
      render nothing: true, status: :ok
    else
      render_error game
    end
  end

  def update_params
    params.require(:game)
  end

end
