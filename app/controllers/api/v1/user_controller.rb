require 'jwt'
require 'bcrypt'
class Api::V1::UserController < ApplicationController
  def index
    render json: {status: "WELCOME"}
  end
  def create
 
    user = User.create( 'name' => params[:name],
            'email' => params[:email],
            'password' => params[:password_digest])
      if user.valid?
        payload = {user_id: user.id}
        token = encode_token(payload)
        render json: {status: "User created", data: user, jwt: token}
      else
        render json: {errors: user.errors}, status: :unprocessable_entity
      end
  end
  private
  def user_params
    params.require(:user).permit(:name,:email, :password_digest)
  end
  def encode_token(payload={})
    exp = 72.hours.from_now
    payload[:exp] = exp.to_i
    JWT.encode(payload, 'Next99!@#' )
# For developemnt: Rails.application.secrets.secret_key_base
# For development: Rails.application.credentials.secret_key_base
  end

  
end
