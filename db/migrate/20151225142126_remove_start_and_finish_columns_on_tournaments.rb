class RemoveStartAndFinishColumnsOnTournaments < ActiveRecord::Migration
  def change
    remove_column :tournaments, :start
    remove_column :tournaments, :finish
  end
end
