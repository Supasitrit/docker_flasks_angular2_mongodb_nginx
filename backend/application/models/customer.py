from application import db
from application.models.user import *

class Customer(db.Document):
	name = db.StringField()
	email = db.StringField()
	facebook = db.StringField()
	phone = db.StringField()
	current = db.BooleanField()
	created_by = db.ReferenceField(User)
	created_at = db.DateTimeField()
	modified_at = db.DateTimeField()