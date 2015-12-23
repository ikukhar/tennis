class CreateMembers < ActiveRecord::Migration
  def change
    create_table :members do |t|
      t.belongs_to :rounds, index: true
      t.integer :team_id
      t.timestamps null: false
    end
  end
end
