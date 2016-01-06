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
    @current_user = User.find_by(id: payload['user_id'])
  rescue
    render_error 'Unauthorized!'
  end

  def token
    request.headers['Authorization'].split(' ').last if request.headers['Authorization']
  end

  protected

  def render_error(obj)
    if obj.is_a?(ActiveRecord::Base)
      message = obj.errors.messages.to_a.join(': ')
    else
      message = obj
    end
    render json: { token: nil, message: message }, status: 422
  end

end
