class TemplatesController < ApplicationController

  skip_before_action :authenticate_by_token

  def angular
    render 'layouts/application'
  end

  def template
    path = 'templates/' + params[:name]
    path = path + '/' + params[:name2] if params[:name2]
    path = path + '/' + params[:name3] if params[:name3]
    path = path + '/' + params[:name4] if params[:name4]
    render  path, layout: nil
  end

end
