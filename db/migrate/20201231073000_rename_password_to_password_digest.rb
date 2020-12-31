class RenamePasswordToPasswordDigest < ActiveRecord::Migration[6.1]
  def change
    change_table :user do |t|   
      rename_column :users, :password, :password_digest
    end
  end
end
