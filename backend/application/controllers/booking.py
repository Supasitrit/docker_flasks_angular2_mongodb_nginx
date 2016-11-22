from application import app
from flask import Flask, request, redirect, url_for,jsonify, g
from application.decorators.token import *
from flask_restful import marshal
from application.utils.date_time import *
from application.utils.booking import *
from application.utils.room import *
from application import pdfs
from application.forms.booking import *
import datetime
from application import mail
from flask_mail import Message
from application.outputs.booking import *
from application.outputs.customer import *
from application.exceptions.simple_error import *


@app.route("/ams/bookings",methods=["POST"])
@require_token
def create_booking():
	# msg = Message(
 #              'Hello',
	#        sender='vorathep055@gmail.com',
	#        recipients=
 #               ['vorathep055@gmail.com'])
	# msg.body = "This is the email body"
	# mail.send(msg)
	form = BookingForm()
	_booking = Booking()
	_booking.customers = form.customers
	_booking.check_in = form.check_in_dt
	_booking.check_out = form.check_out_dt
	_booking.deposit = form.deposit.data
	_booking.room_type = form.room_type.data
	_booking.ppm = form.ppm.data
	_booking.note = form.note.data
	_booking.confirmed = form.confirmed.data
	_booking.room_name = form.room.name
	_booking.created_by = g.user
	_booking.created_at = dt_now()
	_booking.modified_at = dt_now()
	_booking.save()
	for customer in form.customers:
		customer.customer_state = 1
		customer.save()
	_room = getRoomDetail(form.room.name)
	_room.booking_history.append(_booking)
	_room.current_booking = _booking
	_room.modified_at = dt_now()
	_room.save()
	booking = marshal(_booking,BookingOutput)
	return jsonify(success=True,booking=booking)


@app.route("/ams/bookings/activity",methods=["GET"])
@require_token
def booking_activity():
	# Arguments gathering
	start_date = request.args.get('start_date', '')
	end_date = request.args.get('end_date','')
	client = request.args.get('client',None)

	start_date_dt = string_to_dt(start_date)
	end_date_dt = string_to_dt(end_date)
	if start_date_dt == None or end_date_dt == None:
		raise BadRequestError("Invalid dates")
	end_date_dt = end_date_dt + datetime.timedelta(1)
	if client == None or client == "mobile":
		res = bookingActivity(start_date_dt,end_date_dt)
	else:
		res = bookingActivityForWeb(start_date_dt,end_date_dt)
	return jsonify(activity=res,success=True)

@app.route("/ams/rooms/<room_name>/bookings",methods=["GET"])
@require_token
def list_booking_history(room_name):
	_room = getRoomDetail(room_name)
	if not _room:
		raise BadRequestError("This room does not exist")
	_bookings = booking_history(room_name)
	bookings = list()
	for _booking in _bookings:
		booking = marshal(_booking,BookingOutput)
		bookings.append(booking)
	return jsonify(success=True,bookings=bookings)

@app.route("/ams/bookings/<booking_id>",methods=["PUT"])
@require_token
def update_booking(booking_id):
	_booking = getBookingDetails(booking_id)
	if not _booking:
		raise BadRequestError("Booking does not exist")
	form = BookingForm(_booking)
	_room = getRoomDetail(_booking.room_name)
	_room.booking_history.remove(_booking)
	for customer in _booking.customers:
		customer.customer_state = 1
		customer.save()
	_room = getRoomDetail(_booking.room_name)
	_room.booking_history.remove(_booking)
	_booking.customers = form.customers
	_booking.check_in = form.check_in_dt
	_booking.check_out = form.check_out_dt
	_booking.deposit = form.deposit.data
	_booking.ppm = form.ppm.data
	_booking.note = form.note.data
	_booking.confirmed = form.confirmed.data
	_booking.room_name = form.room.name
	_booking.room_type = form.room_type.data
	_booking.created_by = g.user
	_booking.modified_at = dt_now()
	_booking.save()
	_room.save()
	for customer in _booking.customers:
		customer.customer_state = 2
		customer.save()
	_room = getRoomDetail(form.room.name)
	_room.booking_history.append(_booking)
	_room.current_booking = _booking
	_room.modified_at = dt_now()
	_room.save()
	booking = marshal(_booking,BookingOutput)
	return jsonify(success=True,booking=booking)


@app.route("/ams/bookings",methods=["GET"])
@require_token
def list_bookings():
	_bookings = all_booking()
	bookings = list()
	for _booking in _bookings:
		booking = marshal(_booking,BookingOutput)
		bookings.append(booking)
	return jsonify(success=True,bookings=bookings)

@app.route("/ams/bookings/<booking_id>",methods=["DELETE"])
@require_token
def delete_booking(booking_id):
	_booking = getBookingDetails(booking_id)
	if not _booking:
		raise BadRequestError("Booking does not exist")
	_booking.delete()
	return jsonify(success=True)

@app.route("/ams/bookings/<booking_id>",methods=["GET"])
@require_token
def booking_info(booking_id):
	_booking = getBookingDetails(booking_id)
	if not _booking:
		raise BadRequestError("Booking does not exist")
	
	booking = marshal(_booking,BookingDetailOutput)
	return jsonify(success=True,booking=booking)

# @app.route("/ams/bookings/<booking_id>/pdf-gen",methods=["GET"])
# @require_token
# def pdf():
# 	create_pdf()
# 	return "THis"

# @app.route("/ams/bookings/<booking_id>",methods=['PUT'])
# @require_token
# def edit_booking(booking_id):
# 	form = BookingFrom()
# 	return "not implemented"

