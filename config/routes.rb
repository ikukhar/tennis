Rails.application.routes.draw do
  root 'templates#angular'

  get 'templates/home', to: 'templates#home'
  get 'templates/tournaments', to: 'templates#tournaments'
  get 'templates/tournaments_new', to: 'templates#new_tournament'

  get 'api/tournaments', to: 'tournaments#index'
  get 'api/rounds', to: 'rounds#index'

  get '*path', to: 'templates#angular'
end
