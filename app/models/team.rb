class Team < ActiveRecord::Base
  belongs_to :tournament
  belongs_to :player1, class_name: 'User'
  belongs_to :player2, class_name: 'User'
  has_many :games
end
