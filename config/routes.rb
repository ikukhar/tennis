Rails.application.routes.draw do

  root 'templates#angular'
  get 'templates/:template', to: 'templates#template'

  namespace :api do
    resources :tournaments
    resources :users
    get 'rounds', to: 'rounds#index'
  end

  namespace :auth do
    post 'signup', to: 'session#signup'
    post 'login',  to: 'session#login'
    post '/:provider/callback', to: 'session#omniauth_callback'
  end

  mount Ryakuzu::Engine => '/ryakuzu'

  get '*path', to: 'templates#angular'

end
