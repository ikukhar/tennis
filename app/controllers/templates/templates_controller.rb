class Templates::TemplatesController < ApplicationController
  # TODO: Разбросать на несколько контроллеров??
  def angular
    render 'layouts/application'
  end

  def home
    render 'home', layout: nil
  end

  def tournaments
    render 'tournaments', layout: nil
  end

  def tournaments_editing
    render 'tournaments.editing', layout: nil
  end

  def tournaments_editing_rounds
    render 'tournaments.editing.rounds', layout: nil
  end

end
