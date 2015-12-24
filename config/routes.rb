Rails.application.routes.draw do
  root 'templates/templates#angular'
  # TODO: Улучшить роутинг!
  namespace :templates do
    get 'home', to: 'templates#home'
    get 'tournaments', to: 'templates#tournaments'
    get 'tournaments_new', to: 'templates#tournaments_new'
    get 'tournaments_new_rounds', to: 'templates#tournaments_new_rounds'
  end

  namespace :api do
    get 'tournaments', to: 'tournaments#index'
    get 'tournaments/:id', to: 'tournaments#show', as: 'tournament'
    post 'tournaments', to: 'tournaments#create'
    get 'rounds', to: 'rounds#index'
  end

  get '*path', to: 'templates/templates#angular'
end
