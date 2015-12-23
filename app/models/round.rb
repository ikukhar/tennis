class Round < ActiveRecord::Base
  belongs_to :tournament
  has_many :members
  has_many :matches
end
