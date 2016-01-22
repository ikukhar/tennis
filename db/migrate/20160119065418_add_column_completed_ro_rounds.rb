class AddColumnCompletedRoRounds < ActiveRecord::Migration
  def change
    add_column :rounds, :completed, :boolean
  end
end
