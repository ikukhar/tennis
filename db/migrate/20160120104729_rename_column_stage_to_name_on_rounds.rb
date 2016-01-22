class RenameColumnStageToNameOnRounds < ActiveRecord::Migration
  def change
    rename_column :rounds, :stage, :name
  end
end
