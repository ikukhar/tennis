class Api::RoundsController < ApplicationController
  skip_before_action :authenticate_by_token, except: [:create, :update, :destroy]
  before_action :check_admin, only: [:create, :update, :destroy]
  
  def index
    respond_with :api, Round.includes(:tournament).where(tournament_id: params[:tournament_id])
  end

  def new
    # code
  end

  def show
    round = Round.find(params[:id])
    if round
      respond_with :api, round
    else
      render_error 'Round not found'
    end
  end

  def championship_table_data
    render json:  Round.find(params[:id]).championship_table_data
  end

  def create_games
    round = Round.find(params[:id])
    if round.create_games
      respond_with :api, round
    else
      render_error round
    end
  end
end
