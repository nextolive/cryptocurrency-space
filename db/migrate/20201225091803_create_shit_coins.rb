class CreateShitCoins < ActiveRecord::Migration[6.1]
  def change
    create_table :shit_coins do |t|      
      t.string :name
      t.integer :length
      t.string :startAt
      t.string :timestamp
    end
  end
end
