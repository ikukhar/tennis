class AddTournamentColumnOnPlayers < ActiveRecord::Migration
  def change
    add_reference :players, :tournament, index: true
  end
end
