Rails.application.routes.draw do
  root 'templates#angular'
# TODO: Улучшить роутинг!
  get 'templates/home', to: 'templates#home'
  get 'templates/tournaments', to: 'templates#tournaments'
  get 'templates/tournaments_new', to: 'templates#tournaments_new'
  get 'templates/tournaments_new_rounds', to: 'templates#tournaments_new_rounds'

  get 'api/tournaments', to: 'tournaments#index'
  get 'api/rounds', to: 'rounds#index'

  get '*path', to: 'templates#angular'
end
