from flask_wtf import Form
from wtforms import StringField, BooleanField,IntegerField,DecimalField
from application.utils.room import *
from application.utils.customer import *
from application.utils.date_time import *
from application.utils.booking import *

from application.exceptions.simple_error import *

class BookingForm(Form):
	customer_ids = StringField("customer_ids")
	check_in = StringField("check_in")
	check_out = StringField("check_out")
	confirmed = BooleanField("confirmed")
	deposit = DecimalField("deposit")
	ppm = DecimalField("ppm")
	note = StringField("note")
	room_name = StringField("room_name")
	room_type = StringField("room_type")
	def __init__(self,booking=None,is_edit=False, *args,**kwargs):
		Form.__init__(self,*args,**kwargs)
		self.customers = list()
		self.room = None
		self.check_in_dt = None
		self.booking = booking
		self.check_out_dt = None
		self.validate()
		
	def validate(self):
		customer_ids_list = list()
		customer_ids_list = self.customer_ids.data.split(',')
		customer_ids_list = list(set(customer_ids_list))
		for customer_id in customer_ids_list:
			try:
				customer = getCustomerFromID(customer_id)
				if customer:
					self.customers.append(customer)
			except:
				continue
		if len(self.customers) == 0:
			raise BadRequestError("Invalid customer ids")
		self.room = getRoomDetail(self.room_name.data)
		if self.room == None:
			raise BadRequestError("Incorrect Room Name")

		self.check_in_dt = string_to_dt(self.check_in.data)
		self.check_out_dt = string_to_dt(self.check_out.data)
		if self.check_in_dt == None:
			raise BadRequestError("Incorrect Check In Date")
		if self.check_out_dt == None:
			raise BadRequestError("Incorrect Check Out Date")

		
		if not isAvailable(self.check_in_dt,self.check_out_dt,self.room['name'],booking=self.booking):
			raise BadRequestError("Room Unavailable")
		if self.ppm.data is None:
			raise BadRequestError("Price per Month Missing")
		if self.deposit.data is None:
			raise BadRequestError("Deposit Missing")

