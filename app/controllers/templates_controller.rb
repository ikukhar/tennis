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

  def tournaments_new
    render 'tournaments.new', layout: nil
  end

  def tournaments_new_rounds
    render 'tournaments.new.rounds', layout: nil
  end
end
