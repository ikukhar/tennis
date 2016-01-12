class Round < ActiveRecord::Base
  belongs_to :tournament
  has_many :players
  has_many :games
end
