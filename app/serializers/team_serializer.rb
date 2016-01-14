class TeamSerializer < ActiveModel::Serializer
  attributes :id
  has_one :player1
  has_one :player2
end
