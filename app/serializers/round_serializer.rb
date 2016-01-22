class RoundSerializer < ActiveModel::Serializer
  attributes :id, :name, :order, :finished, :prev_round, :next_round, :tournament
end
