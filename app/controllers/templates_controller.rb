class TemplatesController < ApplicationController

  skip_before_action :authenticate_by_token

  def angular
    render 'layouts/application'
  end

  def template
    render params[:template], layout: nil
  end

end
