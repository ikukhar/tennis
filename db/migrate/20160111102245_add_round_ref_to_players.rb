class AddRoundRefToPlayers < ActiveRecord::Migration
  def change
    add_reference :players, :round, index: true, foreign_key: true
  end
end
