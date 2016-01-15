class RenameColumnMatchSetsOnRounds < ActiveRecord::Migration
  def change
    rename_column :rounds, :match_sets, :sets
  end
end
