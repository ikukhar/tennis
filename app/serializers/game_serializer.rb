class GameSerializer < ActiveModel::Serializer
  attributes :id
  has_one :round
  has_one :team1
  has_one :team2
end
