class CreateTournaments < ActiveRecord::Migration
  def change
    create_table :tournaments do |t|
      t.string :name
      t.integer :type
      t.integer :status
      t.date :start
      t.date :finish
      t.timestamps null: false
    end
  end
end
