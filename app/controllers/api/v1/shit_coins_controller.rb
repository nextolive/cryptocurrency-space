class Api::V1::ShitCoinsController < ApplicationController
  def index
   shitcoin = ShitCoin.all.where(user_id:params[:id]).order(id: :desc)
    render json: shitcoin
  end

  def create
   shitcoin = ShitCoin.create!(shitcoin_params)
    if shitcoin
      render json: shitcoin
    else
      render json: shitcoin.errors
    end
  end

  def show
     if shitcoin
      render json: shitcoin
    else
      render json: shitcoin.errors
    end
  end

  def update
   shitcoin = ShitCoin.update(params[:id],shitcoin_params)
    if shitcoin
      render json: shitcoin_params
    else
      render json: shitcoin.errors
    end
  end

 def destroy
    shitcoin&.destroy
    render json: { message: 'ShitCoin deleted!' }
  end
  private

  def shitcoin_params
    params.permit(:name, :length, :startAt, :epochNo,:user_id,:url)
  end

  def shitcoin
    @shitcoin ||= ShitCoin.find(params[:id])
  end
end
