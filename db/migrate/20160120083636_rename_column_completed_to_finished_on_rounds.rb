class RenameColumnCompletedToFinishedOnRounds < ActiveRecord::Migration
  def change
    rename_column :rounds, :completed, :finished
    remove_column :rounds, :status
  end
end
