Rails.application.routes.draw do

  root 'templates#angular'
  get 'templates/:name(/:name2(/:name3(/:name4)))', to: 'templates#template'

  namespace :api do
    resources :users
    resources :tournaments
    resources :rounds
    resources :teams
    resources :games
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
