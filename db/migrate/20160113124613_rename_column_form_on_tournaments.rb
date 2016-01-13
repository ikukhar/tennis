class RenameColumnFormOnTournaments < ActiveRecord::Migration
  def change
    rename_column :tournaments, :form, :mode
  end
end
