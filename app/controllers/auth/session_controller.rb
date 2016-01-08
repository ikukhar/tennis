class Auth::SessionController < ApplicationController
  skip_before_action :authenticate_by_token


  def omniauth_callback

    provider_hash = auth_by_provider

    if params[:isLinking]
      authenticate_by_token
    else
      unless @current_user = User.find_by_email(provider_hash[:email])
        @current_user = User.new(
          email: provider_hash[:email],
          first_name: provider_hash[:first_name],
          last_name: provider_hash[:last_name]
        )
      end
    end

    auth = Authorization.find_or_create_by(user: @current_user,
                                           provider: provider_hash[:provider],
                                           uid: provider_hash[:uid])
    if auth
      render json: token, status: :created
    else
      render_error 'Auth error!'
    end
  end

  def auth_by_provider
    provider = params[:provider]

    provider_hash = send("#{provider}_callback")
    provider_hash[:provider] = provider

    validate_auth_hash(provider_hash)

    provider_hash
  end

  def signup
    @current_user = User.new(signup_params)
    if @current_user.save
      render json: token, status: :created
    else
      render_error @current_user
    end
  end

  def login
    @current_user = User.find_by_email(params[:email])
    if @current_user && !@current_user.password_digest.nil? && @current_user.authenticate(params[:password])
      render json: token, status: :created
    else
      render_error 'User not found!'
    end
  end

  def unlink
    authenticate_by_token
    auth = Authorization.find_by_user_id_and_provider(@current_user, params[:provider])
    if auth.destroy
      render json: token, status: :created
    else
      render_error auth
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
                                           fields: 'email,first_name, last_name'
                                 }, accept: :json)

    auth_hash = JSON.parse(auth_result).deep_symbolize_keys
    auth_hash[:uid] = auth_hash[:id]
    puts auth_hash
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
    auth_hash = JSON.parse(auth_result).deep_symbolize_keys

    auth_hash[:first_name], auth_hash[:last_name] = auth_hash[:name].slice(' ')
    auth_hash[:uid] = auth_hash[:id]
    puts auth_hash
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

    auth_hash = JSON.parse(auth_result).deep_symbolize_keys
    auth_hash = auth_hash[:response][0]
    auth_hash[:email] = result['email']

    auth_hash
  end

  def signup_params
    params.require(:session).permit(:first_name, :last_name, :email, :password, :password_confirmation)
  end

  def validate_auth_hash(auth_hash)
    unless [:provider, :uid, :first_name, :last_name, :email].all? { |key| auth_hash.key? key }
      fail 'Authentification hash must have all of these keys:
      [:provider, :uid, :first_name, :last_name, :email]'
    end
  end
end
