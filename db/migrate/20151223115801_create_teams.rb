class CreateTeams < ActiveRecord::Migration
  def change
    create_table :teams do |t|
      t.belongs_to :tournament, index: true
      t.timestamps null: false
    end
  end
end
