class Api::TeamsController < ApplicationController
  skip_before_action :authenticate_by_token, except: [:create, :update, :destroy]
  before_action :check_admin, only: [:create, :update, :destroy]

  def index
    respond_with :api, Team.includes(:player1, :player2)
                        .where(tournament_id: params[:tournament_id])
  end

end
