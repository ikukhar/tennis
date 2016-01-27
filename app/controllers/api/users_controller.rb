class Api::UsersController < ApplicationController
  skip_before_action :authenticate_by_token, except: [:create, :update, :destroy]

  def index
    respond_with :api, User.all
  end

  def show
    if @user = User.find(params[:id])
      respond_with :api, @user.to_json(include: :authorizations, only:[:first_name, :last_name, :email, :id, :admin])
    else
      render_error 'User not found'
    end
  end

  def create
    @user = User.new(
      first_name: user_params[:first_name],
      last_name: user_params[:last_name],
      email:  user_params[:email]
    )
    if @user.save
      respond_with :api, @user
    else
      render_error @user
    end
  end

  def update
    @user = User.find(params[:id])
    if @user.update_attributes(
      first_name: user_params[:first_name],
      last_name: user_params[:last_name],
      email:  user_params[:email]
    )
      respond_with :api, @user
    else
      render_error @user
    end
  end

  def destroy
    @user = User.find(params[:id])
    if @user.destroy
      head :no_content
    else
      render_error @user
    end
  end

  def players_rating
    render json: User.players_statistic
  end

  def calculate_rating
    Tournament.calculate_players_rating!
    render nothing: true
  end

  private

  def user_params
    params.require(:user)
  end

end
