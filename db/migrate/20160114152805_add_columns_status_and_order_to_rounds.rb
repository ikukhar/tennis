class AddColumnsStatusAndOrderToRounds < ActiveRecord::Migration
  def change
    remove_column :rounds, :start_stage
    add_column :rounds, :status, :string
    add_column :rounds, :order, :integer    
  end
end
