class CreateMatches < ActiveRecord::Migration
  def change
    create_table :matches do |t|
      t.belongs_to :rounds, index: true
      t.integer :team1_id
      t.integer :team2_id
      t.timestamps null: false
    end
  end
end
