from application import db

class Note(db.Document):
	created_at = db.DateTimeField()
	text = db.StringField()