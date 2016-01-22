class GameSerializer < ActiveModel::Serializer
  attributes :id, :score, :finished, :round, :tournament
  # has_one :round
  has_one :team1
  has_one :team2
  has_one :winner
end
