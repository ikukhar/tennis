class User < ActiveRecord::Base

  has_many :authorizations
  has_secure_password

  validates_presence_of :name, :surname
  validates_uniqueness_of :email
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, presence: true, format: { with: VALID_EMAIL_REGEX }

end
