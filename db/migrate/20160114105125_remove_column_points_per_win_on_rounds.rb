class RemoveColumnPointsPerWinOnRounds < ActiveRecord::Migration
  def change
    remove_column :rounds, :points_per_win
  end
end
