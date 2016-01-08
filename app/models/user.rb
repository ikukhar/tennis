class User < ActiveRecord::Base
  # attr_accessor :updating_password
  has_many :authorizations
  has_secure_password :validations => false

  validates_presence_of :first_name, :last_name
  validates_uniqueness_of :email
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, presence: true, format: { with: VALID_EMAIL_REGEX }

  # validates_presence_of :password, if: ->{ updating_password || new_record? }
  # validates_confirmation_of :password, if: ->{ updating_password || new_record? }
end
