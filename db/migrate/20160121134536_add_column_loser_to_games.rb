class AddColumnLoserToGames < ActiveRecord::Migration
  def change
    add_column :games, :loser_id, :integer
  end
end
