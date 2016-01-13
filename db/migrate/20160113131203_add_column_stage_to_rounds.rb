class AddColumnStageToRounds < ActiveRecord::Migration
  def change
    add_column :rounds, :stage, :string
  end
end
