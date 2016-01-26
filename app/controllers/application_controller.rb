require 'application_responder'

class ApplicationController < ActionController::Base
  self.responder = ApplicationResponder
  respond_to :json
  attr_accessor :current_user

  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :null_session
  before_action :authenticate_by_token

  def check_admin
    unless @current_user.admin?
      render_error 'Permission denied!', 403
    end
  end

  private

  def authenticate_by_token
    payload, header = JWT.decode(token_from_client, Rails.application.secrets.secret_key_base)
    @current_user = User.find_by(id: payload['user_id'])
  rescue
    render_error 'Unauthorized!', 403
  end

  def token_from_client
    request.headers['Authorization'].split(' ').last if request.headers['Authorization']
  end

  def token
    { token: JsonWebToken.encode({ user_id: @current_user.id, user_email: @current_user.email }, 7.day.from_now) }
  end

  def render_error(obj, status = 422)
    if obj.is_a?(ActiveRecord::Base)
      message = obj.errors.messages.to_a.join(': ')
    else
      message = obj
    end
    render json: { token: nil, message: message }, status: status
  end
end
