Rails.application.routes.draw do
  root 'templates/templates#angular'
  # TODO: Улучшить роутинг!
  namespace :templates do
    get 'home', to: 'templates#home'
    get 'tournaments', to: 'templates#tournaments'
    get 'tournaments_editing', to: 'templates#tournaments_editing'
    get 'tournaments_editing_rounds', to: 'templates#tournaments_editing_rounds'
  end

  namespace :api do
    resources :tournaments
    get 'rounds', to: 'rounds#index'
  end

  get '*path', to: 'templates/templates#angular'
end
