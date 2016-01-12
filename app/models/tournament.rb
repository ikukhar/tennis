class Tournament < ActiveRecord::Base
  has_many :rounds, :dependent => :destroy
  has_many :players, :dependent => :destroy
  has_many :teams, :dependent => :destroy
end
