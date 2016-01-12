class RemoveTeamColumnOnGames < ActiveRecord::Migration
  def change
    remove_column :games, :team_id
  end
end
