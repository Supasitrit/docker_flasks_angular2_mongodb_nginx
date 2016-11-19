from application import db
from application.models.user import *

class Maintenance(db.Document):
	cost = db.DecimalField()
	title = db.StringField()
	created_by = db.ReferenceField(User)
	created_at = db.DateTimeField()
	modified_at = db.DateTimeField()
	room_name = db.StringField()
	img_url = db.StringField()