class AddColumnsPlayer1AndPlayer2ToTeams < ActiveRecord::Migration
  def change
    add_column :teams, :player_1, :integer
    add_column :teams, :player_2, :integer
  end
end
