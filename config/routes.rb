Rails.application.routes.draw do
  root 'templates#angular'
  get 'templates/:action', to: 'templates#:action'
  get 'api/tournaments', to: 'tournaments#index'
  get '*path', to: 'templates#angular'
end
