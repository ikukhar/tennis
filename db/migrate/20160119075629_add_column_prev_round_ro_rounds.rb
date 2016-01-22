class AddColumnPrevRoundRoRounds < ActiveRecord::Migration
  def change
    add_column :rounds, :prev_round_id, :integer
  end
end
