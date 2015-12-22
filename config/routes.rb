Rails.application.routes.draw do
  root 'templates#angular'
  get 'templates/:action', to: 'templates#:action'
  get '*path', to: 'templates#angular'
end
