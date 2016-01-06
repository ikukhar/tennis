class Api::UsersController < ApplicationController

  def show
    # TODO: Ограничить поля (password_digest)
    if @user = User.find(params[:id])
      respond_with :api, @user
    else
      render_error 'User not found'
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

  private

  def user_params
    params.require(:user).permit(:name, :surname, :email)
  end

end
