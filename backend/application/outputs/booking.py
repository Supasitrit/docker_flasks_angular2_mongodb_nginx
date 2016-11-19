from flask_restful import fields
from application.outputs.customer import *
from application.outputs.user import *

MiniOutput = {
	'booking_id':fields.String(attribute="id"),
	'customers': fields.List(fields.Nested(CustomerOutput),attribute="customers")
}

BookingOutput = {
	'booking_id':fields.String(attribute="id"),
	'customers': fields.List(fields.Nested(CustomerOutput),attribute="customers"),
	'check_in': fields.DateTime(dt_format='iso8601'),
	'check_out': fields.DateTime(dt_format='iso8601'),
	'room_name': fields.String,
	'confirmed':fields.Boolean(default=False)
}

BookingDetailOutput = {
	'booking_id':fields.String(attribute="id"),
	'customers': fields.List(fields.Nested(CustomerOutput),attribute="customers"),
	'check_in': fields.DateTime(dt_format='iso8601'),
	'check_out': fields.DateTime(dt_format='iso8601'),
	'deposit': fields.Float,
	'modified_at': fields.DateTime(dt_format='iso8601'),
	'ppm':fields.Float,
	'room_type':fields.String,
	'room_name':fields.String,
	'created_at': fields.DateTime(dt_format='iso8601'),
	'created_by':fields.Nested(UserOutput),
	'confirmed':fields.Boolean
}

DailyActivityOutput = {
	'check_in':fields.List(fields.Nested(MiniOutput)),
	'check_out':fields.List(fields.Nested(MiniOutput))
}