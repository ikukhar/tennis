class AddColumnNextRoundToRounds < ActiveRecord::Migration
  def change
    add_column :rounds, :next_round, :integer
  end
end
