from flask_wtf import Form
from wtforms import StringField, BooleanField,IntegerField
from application.utils.room import *
from application.exceptions.simple_error import *


class RoomForm(Form):
	building = StringField("building")
	room_number = StringField("number")

	def __init__(self, *args,**kwargs):
		Form.__init__(self,*args,**kwargs)
		self.validate()

	def validate(self):
		self.room = getRoomDetail(self.building.data + self.room_number.data)
		if self.room != None:
			raise BadRequestError("Sorry, this room already exist in the system")

class RoomStateChangeForm(Form):
	room_state = IntegerField("room_state")
	def __init__(self, *args,**kwargs):
		Form.__init__(self,*args,**kwargs)
		self.validate()