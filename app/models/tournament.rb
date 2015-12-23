class Tournament < ActiveRecord::Base
  has_many :rounds
  has_many :teams
end
