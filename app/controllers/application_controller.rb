require 'application_responder'

class ApplicationController < ActionController::Base
  self.responder = ApplicationResponder
  respond_to :json

  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :null_session

  before_action :authenticate_by_token

  # TODO: DRY common methods
  private

  def authenticate_by_token
    payload, header = JWT.decode(token, Rails.application.secrets.secret_key_base)
    @current_user = User.find_by(id: payload['id'])
  rescue
    render json: error('Unauthorized!'), status: :unauthorized
  end

  def token
    request.headers['Authorization'].split(' ').last if request.headers['Authorization']
  end

  def error(message)
    { token: nil, message: message }
  end
end
