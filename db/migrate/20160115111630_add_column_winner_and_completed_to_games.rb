class AddColumnWinnerAndCompletedToGames < ActiveRecord::Migration
  def change
    add_column :games, :winner_id, :integer
    add_column :games, :completed, :boolean
  end
end
