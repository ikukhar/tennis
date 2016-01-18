class Game < ActiveRecord::Base
  belongs_to :round
  belongs_to :team1, class_name: 'Team'
  belongs_to :team2, class_name: 'Team'
  belongs_to :winner, class_name: 'Team'
  serialize :score, JSON

  before_save do |game|
    game.completed = game.winner ? true : false
  end
end
