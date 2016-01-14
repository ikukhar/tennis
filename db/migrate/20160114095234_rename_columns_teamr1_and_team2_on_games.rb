class RenameColumnsTeamr1AndTeam2OnGames < ActiveRecord::Migration
  def change
    rename_column :games, :team_1, :team1_id
    rename_column :games, :team_2, :team2_id
    add_index :games, :team1_id
    add_index :games, :team2_id
  end
end
