class Api::UsersController < ApplicationController
  def index
    respond_with :api, User.all
  end

  def show
    if @user = User.find(params[:id])
      respond_with :api, @user.to_json(include: :authorizations, only:[:first_name, :last_name, :email])
    else
      render_error 'User not found'
    end
  end

  def create
    @user = User.new(user_params)
    if @user.save
      respond_with :api, @user
    else
      render_error @user
    end
  end

  def update
    @user = User.find(params[:id])
    if @user.update_attributes(user_params)
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

  private

  def user_params
    params.require(:user).permit(:first_name, :last_name, :email)
  end
end
