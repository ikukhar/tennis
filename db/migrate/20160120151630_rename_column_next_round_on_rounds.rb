class RenameColumnNextRoundOnRounds < ActiveRecord::Migration
  def change
    rename_column :rounds, :next_round, :next_round_id
  end
end
