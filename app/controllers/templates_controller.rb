class TemplatesController < ApplicationController

  def angular
    render "layouts/application"
  end

  def tournaments
    render :tournaments, layout: nil
  end

end
