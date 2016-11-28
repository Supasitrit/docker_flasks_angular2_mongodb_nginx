from flask_restful import fields
from application.outputs.user import *

CustomerOutput = {
	'name': fields.String,
	'email': fields.String,
	'phone': fields.String,
	'customer_id': fields.String(attribute="id"),
	'current': fields.Boolean(default=False),
	'created_at': fields.DateTime(dt_format='iso8601')
}

CustomerDetailOutput = {
	'name': fields.String,
	'email': fields.String,
	'facebook': fields.String,
	'phone': fields.String,
	'created_at': fields.DateTime(dt_format='iso8601'),
	'created_by':fields.Nested(UserOutput),
	'current':fields.Boolean(default=False),
	'modified_at':fields.DateTime(dt_format='iso8601'),
	'customer_id': fields.String(attribute="id")
}