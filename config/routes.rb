Rails.application.routes.draw do

  root 'templates#angular'
  get 'templates/:name(/:name2(/:name3(/:name4)))', to: 'templates#template'

  namespace :api do
    resources :users
    get 'tournaments/years', to: 'tournaments#years'
    resources :tournaments
    resources :rounds
    get 'rounds/:id/championship_table_data', to: 'rounds#championship_table_data'
    post 'rounds/:id/createGames', to: 'rounds#create_games'
    resources :teams
    get 'games/test/', to: 'games#test'
    resources :games
    get 'rating', to: 'users#players_rating'
  end

  namespace :auth do
    post 'signup', to: 'session#signup'
    post 'login',  to: 'session#login'
    post 'unlink',  to: 'session#unlink'
    post '/:provider/callback', to: 'session#omniauth_callback'
  end

  get '*path', to: 'templates#angular'

end
