class RenameColumnFormOnRounds < ActiveRecord::Migration
  def change
    rename_column :rounds, :form, :mode
  end
end
