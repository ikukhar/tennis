Rails.application.routes.draw do

  root 'templates#angular'
  get 'templates/:name(/:name2(/:name3(/:name4)))', to: 'templates#template'

  namespace :api do
    get 'tournaments/:id/players', to: 'tournaments#players'
    post 'tournaments/:id/create_players', to: 'tournaments#create_players'
    get 'tournaments/:id/rounds', to: 'tournaments#rounds'

    resources :tournaments
    resources :users
    resources :players
    resources :rounds
  end

  namespace :auth do
    post 'signup', to: 'session#signup'
    post 'login',  to: 'session#login'
    post 'unlink',  to: 'session#unlink'
    post '/:provider/callback', to: 'session#omniauth_callback'
  end

  mount Ryakuzu::Engine => '/ryakuzu'

  get '*path', to: 'templates#angular'

end
