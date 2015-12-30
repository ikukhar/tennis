class Auth::SessionController < ApplicationController

  skip_before_action :authenticate_by_token

  def signup
    @user = User.new(signup_params)
    if @user.save
      render json: token, status: :created
    else
      render json: error, status: 422
    end
  end

  def login
    @user = User.find_by(login_params)
    if @user && @user.authenticate(params[:password])
      render json: token, status: :created
    else
      render json: error('User not found!'), status: 422
    end
  end

  private
  def signup_params
    params.require(:session).permit(:name, :surname, :email, :password, :password_confirmation)
  end

  def login_params
    params.require(:session).permit(:email)
  end

  def token
    puts '+++++++++++++++++++++++'
    puts @user.email
    { token: JsonWebToken.encode({ id: @user.id, email: @user.email }, 7.day.from_now) }
  end

  def error( message = @user.errors.messages.to_a.join(': '))
    { token: nil, message: message }
  end

end
