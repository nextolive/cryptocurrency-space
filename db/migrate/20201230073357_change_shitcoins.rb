class ChangeShitcoins < ActiveRecord::Migration[6.1]
  def change
    change_table :shit_coins do |t|       
       t.string :epochNo      
    end
  end
end
