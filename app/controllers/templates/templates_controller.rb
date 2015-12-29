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

  def tournament_add
    render 'tournament-add', layout: nil
  end

  def tournament_edit
    render 'tournament-edit', layout: nil
  end

  def tournament_show
    render 'tournament-show', layout: nil
  end

  def tournament_form
    render 'tournament-form', layout: nil
  end

  def tournament_rounds
    render 'tournament-rounds', layout: nil
  end

  def login
    render 'login', layout: nil
  end

  def signup
    render 'signup', layout: nil
  end

end
