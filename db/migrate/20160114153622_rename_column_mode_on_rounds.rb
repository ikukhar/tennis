class RenameColumnModeOnRounds < ActiveRecord::Migration
  def change
    rename_column :rounds, :mode, :stage    
  end
end
