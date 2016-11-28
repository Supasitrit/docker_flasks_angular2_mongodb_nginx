from flask_wtf import Form
from wtforms import StringField, BooleanField,IntegerField,DecimalField
from application.exceptions.simple_error import *
from application.utils.room import *

class MaintenanceForm(Form):
	room_name = StringField("room_name")
	title = StringField("title")
	cost = DecimalField("cost")
	def __init__(self, *args,**kwargs):
		Form.__init__(self,*args,**kwargs)
		self.validate()

	def validate(self):
		if self.title.data == "":
			raise BadRequestError("Invalid Title")