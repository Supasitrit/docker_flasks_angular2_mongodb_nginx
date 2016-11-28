from flask_restful import fields
from application.outputs.booking import *
from application.outputs.maintenance import *

RoomOutput = {
    'room_number': fields.String,
    'building' :fields.String,
    'name':fields.String,
    'is_available' :fields.Boolean(default=True),
}

RoomDetailOutput = {
	'room_number': fields.String,
    'name':fields.String,
    'building' :fields.String,
    'is_available' :fields.Boolean(default=True),
    'current_booking':fields.Nested(BookingOutput),
    'modified_at': fields.DateTime(dt_format='iso8601'),
    'booking_history': fields.List(fields.Nested(BookingOutput)),
    'maintenance_history': fields.List(fields.Nested(MaintenanceOutput))
}