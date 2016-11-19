from flask_wtf import Form
from wtforms import StringField, validators, FileField
from application.utils.user import *
from application.exceptions.simple_error import *

class UserToken(Form):
	email = StringField("email")
	password = StringField("password")
	def __init__(self, *args,**kwargs):
		Form.__init__(self,*args,**kwargs)
		self.access_token = None
		self.user = None
		self.validate()

	def validate(self):
		self.user = getUser(self.email.data.lower())
		if self.user ==None:
			raise BadRequestError("Incorrect Email")
		self.access_token = generate_access_token(self.email.data.lower(),self.password.data)
		if self.access_token == None:
			raise BadRequestError("Incorrect Password")

class UserRegister(Form):
    email = StringField("email")
    password = StringField("password")
    def __init__(self,*args,**kwargs):
        Form.__init__(self, *args, **kwargs)
        self.validate()

    def validate(self):
        if isUserEmailExist(self.email.data.lower()):
            raise BadRequestError("This email already exist")