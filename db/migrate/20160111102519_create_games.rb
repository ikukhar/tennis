class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.belongs_to(:round, foreign_key: true)
      t.references :team, name: 'team1'
      t.references :team, name: 'team2'
      t.timestamps null: false
    end
  end
end
