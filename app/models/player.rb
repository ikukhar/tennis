class Player < ActiveRecord::Base
  # TODO: REMOVE THIS MODEL
  belongs_to :tournament
  belongs_to :user
end
