class ShitCoin < ApplicationRecord
    validates :name, presence: true
    validates :length, presence: true
    validates :startAt, presence: true
    validates :time, presence: false
    validates :epochNo, presence: true
    validates :user_id, presence: false
    validates :url,presence:false
end
