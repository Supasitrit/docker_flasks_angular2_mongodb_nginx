from application import app
from flask import request,jsonify, g
from application.forms.user import *
from application.utils.user import *
from application.utils.date_time import *

@app.route("/ams/login",methods=["POST"])
def create_token():
	form = UserToken()
	form.user.last_logged_in = dt_now()
	access_token = form.access_token
	return jsonify(success=True,access_token=access_token)



@app.route("/ams/signup",methods=["POST"])
def user_register():
    form = UserRegister()
    newUser = User()
    newUser.email = form.email.data.lower()
    newUser.password = form.password.data
    newUser.save()
    return jsonify(success=True)