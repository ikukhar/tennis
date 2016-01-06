class Auth::SessionController < ApplicationController
  skip_before_action :authenticate_by_token

  def omniauth_callback
    provider = params[:provider]
    auth_hash = send("#{provider}_callback")
    auth_hash['provider'] = provider

    auth = Authorization.find_or_create(auth_hash)
    if @user = auth.user
      render json: token, status: :created
    else
      render_error 'Auth error!'
    end
  end

  def signup
    @user = User.new(signup_params)
    if @user.save
      render json: token, status: :created
    else
      render_error @user.errors.messages.to_a.join(': ')
    end
  end

  def login
    @user = User.find_by_email(params[:email])
    if @user && !@user.password.nil? && @user.authenticate(params[:password])
      render json: token, status: :created
    else
      render_error 'User not found!'
    end
  end

  private

  def facebook_callback
    # TODO: DRY
    result = RestClient.post('https://graph.facebook.com/oauth/access_token',
                             client_id: ENV['FACEBOOK_KEY'],
                             client_secret: ENV['FACEBOOK_SECRET'],
                             code: params[:code],
                             redirect_uri: params[:redirectUri])

    access_token = result[/access_token=(.*)&expires=/, 1]

    auth_result = RestClient.get('https://graph.facebook.com/me',
                                 params: { access_token: access_token,
                                           fields: 'email,name'
                                 }, accept: :json)

    auth_hash = JSON.parse(auth_result)

    auth_hash
  end

  def github_callback
    result = RestClient.post('https://github.com/login/oauth/access_token',
                             { client_id: ENV['GITHUB_KEY'],
                               client_secret: ENV['GITHUB_SECRET'],
                               code: params[:code],
                               redirect_uri: params[:redirectUri]
                             }, accept: :json)

    access_token = JSON.parse(result)['access_token']

    auth_result = RestClient.get('https://api.github.com/user',
                                 params: { access_token: access_token },
                                 accept: :json)
    auth_hash = JSON.parse(auth_result)

    auth_hash
  end

  def vkontakte_callback
    result = RestClient.post('https://oauth.vk.com/access_token',
                             { client_id: ENV['VKONTAKTE_KEY'],
                               client_secret: ENV['VKONTAKTE_SECRET'],
                               code: params[:code],
                               redirect_uri: params[:redirectUri]
                            }, accept: :json)

    result = JSON.parse(result)
    access_token = result['access_token']

    auth_result = RestClient.get('https://api.vk.com/method/users.get',
                                 params: { access_token: access_token, fields: 'photo_id' },
                                 accept: :json)

    auth_hash = JSON.parse(auth_result)

    auth_hash['email'] = result['email']
    auth_hash['name'] = "#{auth_hash['first_name']} #{auth_hash['last_name']}"

    auth_hash
  end

  def signup_params
    params.require(:session).permit(:name, :surname, :email, :password, :password_confirmation)
  end

  def token
    { token: JsonWebToken.encode({ user_id: @user.id, user_email: @user.email }, 7.day.from_now) }
  end

end
