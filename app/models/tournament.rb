class Tournament < ActiveRecord::Base
  has_many :rounds, :dependent => :destroy
  has_many :teams
  accepts_nested_attributes_for :rounds
end
