class Addurltoshitcoin < ActiveRecord::Migration[6.1]
  def change
    change_table :shit_coins do |t|    
      t.string :url   
    end
  end
end
