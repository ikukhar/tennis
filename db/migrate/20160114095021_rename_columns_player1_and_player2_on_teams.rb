class RenameColumnsPlayer1AndPlayer2OnTeams < ActiveRecord::Migration
  def change
    rename_column :teams, :player_1, :player1_id
    rename_column :teams, :player_2, :player2_id
    add_index :teams, :player1_id
    add_index :teams, :player2_id
  end
end
