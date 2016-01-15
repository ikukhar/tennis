class RenameColumnModeTeamsToTypeTeamsOnTournaments < ActiveRecord::Migration
  def change
    rename_column :tournaments, :mode_teams, :teams_type
    rename_column :tournaments, :mode_rounds, :rounds_type
  end
end
