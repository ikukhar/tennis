class RenameColumnModeOnAndAddColumnModeRoundsOnTournaments < ActiveRecord::Migration
  def change
    rename_column :tournaments, :mode, :mode_teams
    add_column :tournaments, :mode_rounds, :string
  end
end
