from flask_wtf import Form
from wtforms import StringField, BooleanField,IntegerField,DecimalField
from application.utils.customer import *
from application.utils.date_time import *

from application.exceptions.simple_error import *

class CustomerForm(Form):
	name = StringField("name")
	email = StringField("email")
	phone = StringField("phone")
	def __init__(self,is_validate=True, *args,**kwargs):
		Form.__init__(self,*args,**kwargs)
		if is_validate: 
			self.validate()

	def validate(self):
		customer = getCustomer(self.email.data)
		if customer != None:
			raise BadRequestError("This email already exists")