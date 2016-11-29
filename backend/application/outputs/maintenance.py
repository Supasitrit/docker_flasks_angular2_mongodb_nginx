from flask_restful import fields
from application.outputs.user import UserOutput

MaintenanceOutput = {
	'maintenance_id': fields.String(attribute="id"),
	'image': fields.String(attribute="img_url"),
	'title': fields.String(attribute="title"),
	'created_at': fields.DateTime(dt_format='iso8601'),
	'created_by':fields.Nested(UserOutput),
	'room_name':fields.String(),
	'cost': fields.Float
}