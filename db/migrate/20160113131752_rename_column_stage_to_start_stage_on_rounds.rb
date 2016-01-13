class RenameColumnStageToStartStageOnRounds < ActiveRecord::Migration
  def change
    rename_column :rounds, :stage, :start_stage
  end
end
