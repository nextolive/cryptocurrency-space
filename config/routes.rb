Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'user/index'
    end
  end
  namespace :api do
    namespace :v1 do
      get 'shit_coins/index/:id' , to: 'shit_coins#index'
      post 'shit_coins/create'
      post 'shit_coins/update/:id' , to: 'shit_coins#update'
      get 'shit_coins/show/:id', to: 'shit_coins#show'
      delete 'shit_coins/destroy/:id', to: 'shit_coins#destroy'
      resource :users, only: [:create]
      post "user/create", to: "user#create"
      post "auth/login", to: "auth#login"
      get "auth/auto_login", to: "auth#auto_login"
      get "auth/user_is_authed", to: "auth#user_is_authed"
    end
  end
  
  root 'homepage#index'
  get '/*path' => 'homepage#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
