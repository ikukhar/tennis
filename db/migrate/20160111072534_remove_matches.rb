class RemoveMatches < ActiveRecord::Migration
  def change
    drop_table :matches
  end
end
