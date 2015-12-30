Rails.application.routes.draw do

  root 'templates/templates#angular'
  # TODO: Улучшить роутинг!
  namespace :templates do
    get 'home', to: 'templates#home'
    get 'tournaments', to: 'templates#tournaments'
    get 'tournament-add', to: 'templates#tournament_add'
    get 'tournament-edit', to: 'templates#tournament_edit'
    get 'tournament-show', to: 'templates#tournament_show'
    get 'tournament-form', to: 'templates#tournament_form'
    get 'tournament-rounds', to: 'templates#tournament_rounds'

    get 'signup', to: 'templates#signup'
    get 'login',  to: 'templates#login'
  end

  namespace :api do
    resources :tournaments
    get 'rounds', to: 'rounds#index'
  end

  namespace :auth do
    post 'signup', to: 'session#signup'
    post 'login',  to: 'session#login'
  end

  mount Ryakuzu::Engine => '/ryakuzu'

  get '*path', to: 'templates/templates#angular'
end
