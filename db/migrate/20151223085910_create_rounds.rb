class CreateRounds < ActiveRecord::Migration
  def change
    create_table :rounds do |t|
      t.belongs_to :tournament, index: true
      t.string :form
      t.integer :match_sets
      t.integer :points_per_win
      t.timestamps null: false
    end
  end
end
