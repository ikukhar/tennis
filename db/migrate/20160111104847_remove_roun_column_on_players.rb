class RemoveRounColumnOnPlayers < ActiveRecord::Migration
  def change
    remove_column :players, :round_id
  end
end
