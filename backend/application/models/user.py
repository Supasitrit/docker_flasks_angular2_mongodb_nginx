from application import db

class User(db.Document):
	email = db.StringField()
	password = db.StringField()
	name = db.StringField()
	last_logged_in = db.DateTimeField()
	created_at = db.DateTimeField()
	user_type = db.IntField()