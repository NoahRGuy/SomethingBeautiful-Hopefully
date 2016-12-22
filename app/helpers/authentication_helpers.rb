def current_user
  @current_user ||= User.find(session[:user_id])
end

def logged_in?
  session[:user_id] != nil
end

def authenticate!
  redirect '/' unless logged_in? && current_user
end
