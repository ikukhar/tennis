class RenameColumnTypeOnTournaments < ActiveRecord::Migration
  def change
    rename_column :tournaments, :type, :form
  end
end
