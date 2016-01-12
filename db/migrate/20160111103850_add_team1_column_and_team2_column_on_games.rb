class AddTeam1ColumnAndTeam2ColumnOnGames < ActiveRecord::Migration
  def change
    add_column :games, :team_1, :integer
    add_column :games, :team_2, :integer
  end
  add_index :games, :round_id
end
