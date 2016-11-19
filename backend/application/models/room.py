from application import db
from application.models.maintenance import *
from application.models.note import *
from application.models.booking import *

class Room(db.Document):
	name = db.StringField()
	created_at = db.DateTimeField()
	modified_at = db.DateTimeField()
	building = db.StringField()
	is_available = db.BooleanField()
	room_number = db.StringField()
	current_booking = db.ReferenceField(Booking,reverse_delete_rule=mongoengine.NULLIFY)
	last_active = db.DateTimeField()
	maintenance_history = db.ListField(db.ReferenceField(Maintenance,reverse_delete_rule=mongoengine.PULL))
	booking_history = db.ListField(db.ReferenceField(Booking,reverse_delete_rule = db.PULL))
