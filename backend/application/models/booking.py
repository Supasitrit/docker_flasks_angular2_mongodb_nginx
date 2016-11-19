from application import db
from application.models.user import *
from application.models.customer import *
import mongoengine

class Booking(db.Document):
	customers = db.ListField(db.ReferenceField(Customer,reverse_delete_rule=mongoengine.PULL))
	room_name = db.StringField()
	check_in = db.DateTimeField()
	check_out = db.DateTimeField()
	deposit = db.DecimalField()
	modified_at = db.DateTimeField()
	ppm = db.DecimalField()
	created_at = db.DateTimeField()
	created_by = db.ReferenceField(User)
	note = db.StringField()
	room_type = db.IntField()
	confirmed = db.BooleanField()

