class ChangeTypeAndStatusOnTournaments < ActiveRecord::Migration
  def change
    remove_column :tournaments, :type
    remove_column :tournaments, :status
    add_column :tournaments, :type, :string
    add_column :tournaments, :status, :string
  end
end
