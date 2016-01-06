class Authorization < ActiveRecord::Base
  belongs_to :user
  validates :provider, :uid, presence: true

  def self.find_or_create(auth_hash)
    # TODO: Проверка наличия полей в auth_hash
    unless auth = find_by_provider_and_uid(auth_hash['provider'], auth_hash['id'])

      unless user = User.find_by_email(auth_hash['email'])
        user = User.new(
          name: auth_hash['name'],
          surname: '',
          email: auth_hash['email'])
        user.save(validate: false)
      end

      auth = create(user: user, provider: auth_hash['provider'], uid: auth_hash['id'])
    end

    auth
  end
end
