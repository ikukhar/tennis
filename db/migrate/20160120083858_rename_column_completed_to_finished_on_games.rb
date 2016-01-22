class RenameColumnCompletedToFinishedOnGames < ActiveRecord::Migration
  def change
    rename_column :games, :completed, :finished
  end
end
