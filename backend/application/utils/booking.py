from application.models.booking import *
from application.utils.room import *
from application.utils.date_time import *
from application import Q
# from reportlab.pdfgen import canvas
# from reportlab.lib.pagesizes import landscape,letter
from flask_restful import marshal
from application.outputs.booking import *

def all_booking():
    result = Booking.objects().order_by("-created_at")
    return result

def getBookingDetails(booking_id):
	result = Booking.objects(id=booking_id).first()
	return result


def getBookedRoomsForAvailible(check_in,check_out):
	result = Booking.objects((Q(check_out__gt=check_in)&Q(check_in__lt=check_out))).only('room_name')
	return result

def isAvailable(check_in,check_out,room_name,booking=None):
	if booking:
		res = Booking.objects(Q(check_out__gt=check_in)&Q(check_in__lt=check_out)&Q(room_name=room_name)&Q(id__ne=booking.id))
	else:
		res = Booking.objects(Q(check_out__gt=check_in)&Q(check_in__lt=check_out)&Q(room_name=room_name))
	if len(res) > 0:
		return False
	return True

def getCurrentBooking(check_in,check_out,room_name):
	res = Booking.objects(Q(check_out__gt=check_in)&Q(check_in__lt=check_out)&Q(room_name=room_name)).first()
	return res

def bookingActivity(start_date,end_date):
	result = dict()
	for single_date in daterange(start_date, end_date):
		res = dict()
		check_ins = list()
		check_outs = list()
		res_in = Booking.objects(check_in=single_date)
		res_out = Booking.objects(check_out=single_date)
		res['check_in'] = res_in
		res['check_out'] = res_out
		res = marshal(res,DailyActivityOutput)
		result[dt_to_string(single_date)] = res
	return result

def bookingActivityForWeb(start_date,end_date):
	result = list()
	for single_date in daterange(start_date, end_date):
		res_ins = Booking.objects(check_in=single_date,confirmed=True)
		res_outs = Booking.objects(check_out=single_date,confirmed=True)
		for res_in in res_ins:
			res = dict()
			res['title'] = ""
			for customer in res_in.customers:
				res['title'] += customer.name
				res['title'] += ","
			res['color'] = "#00abff"
			res['start'] = dt_to_string(res_in.check_out)
			res['booking_id'] = str(res_in.id)
			result.append(res)
		for res_out in res_outs:
			res = dict()
			res['title'] = ""
			for customer in res_out.customers:
				res['title'] += customer.name
				res['title'] += ","
			res['color'] = "#1b70ef"
			res['start'] = dt_to_string(res_out.check_out)
			res['booking_id'] = str(res_out.id)
			result.append(res)
	return result
	
def create_pdf():
	c = canvas.Canvas("sample.pdf", pagesize=landscape(letter))
	c.setFont("Helvetica", 32, leading=None)
	c.drawCentredString(400,100,"Salaya International House")
	c.setFont("Helvetica", 32, leading=None)
	c.drawCentredString(400,150,"Booking Confirmation")
	c.setFont("Helvetica", 200, leading=None)
	c.drawCentredString(400,200,"Booking Confirmation")
	c.save()