class TournamentSerializer < ActiveModel::Serializer
  attributes :id, :name, :teams_type, :rounds_type, :finished, :winner, :created_at
end
