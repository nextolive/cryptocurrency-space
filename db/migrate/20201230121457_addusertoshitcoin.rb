class Addusertoshitcoin < ActiveRecord::Migration[6.1]
  def change
    change_table :shit_coins do |t|    
      t.references :user   
    end
  end
end
