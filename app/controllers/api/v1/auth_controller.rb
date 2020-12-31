class Api::V1::AuthController  < ApplicationController
  def login
    user=User.find_by(email: params[:email])
    if user && user.authenticate(params[:password])
      payload = {user_id: user.id}
      token = encode_token(payload)
      render json: {status: "User Logged In", data: user, jwt: token}
    else
      render json: {errors: "Invalid email or password"}, status: :unprocessable_entity
    end
  end
  
  def auto_login
    if session_user
      render json: session_user
    else
      render json: {errors: "No User Logged In"}
    end
  end

  def user_is_authed
    render json: {message: "You are authorized"}
  end
end