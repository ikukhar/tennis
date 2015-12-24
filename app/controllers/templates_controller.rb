class TemplatesController < ApplicationController
  def angular
    render 'layouts/application'
  end

  def home
    render 'home', layout: nil
  end

  def tournaments
    render 'tournaments', layout: nil
  end

  def new_tournament
    render 'tournaments.new', layout: nil
  end
end
