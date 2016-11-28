from application import app
from flask import Flask, request, redirect, url_for,jsonify, g
from application.decorators.token import *
from flask_restful import marshal
from application.utils.date_time import *
from application.utils.room import *
from application.utils.booking import *
from application.forms.room import *
from application.outputs.room import *
from application.exceptions.simple_error import *


@app.route("/ams/rooms",methods=["POST"])
@require_token
def create_room():
	form = RoomForm()
	_room = Room()
	_room.building = form.building.data
	_room.room_number = form.room_number.data
	_room.name = _room.building + _room.room_number
	_room.created_at = dt_now()
	_room.modified_at = dt_now()
	_room.save()
	print _room
	room = marshal(_room,RoomOutput)
	return jsonify(success=True,room=room)

@app.route("/ams/rooms",methods=["GET"])
@require_token
def list_rooms():
	_rooms = all_rooms()
	rooms = list()
	for _room in _rooms:
		_resRoom = getAvOfRoom(_room)
		room = marshal(_resRoom,RoomOutput)
		rooms.append(room)
	return jsonify(success=True,rooms=rooms)

@app.route("/ams/rooms/<roominfo>",methods=["GET"])
@require_token
def room_info(roominfo):
	_room = getRoomDetail(roominfo)
	if not _room:
		raise BadRequestError("This room does not exist")
	room = marshal(_room,RoomDetailOutput)
	return jsonify(success=True,room=room)


# @app.route("/ams/rooms/<room_name>",methods=["PUT"])
# @require_token
# def edit_room(room_name):
# 	_room = getRoomDetail(room_name)
# 	if not _room:
# 		raise BadRequestError("This room does not exist")
# 	form = RoomStateChangeForm()
# 	_room.save()
# 	room = marshal(_room,RoomOutput)
# 	return jsonify(success=True,room=room)
	
@app.route("/ams/rooms/availibity",methods=['GET'])
@require_token
def list_available_rooms():

	# Arguments gathering
	check_in = request.args.get('check_in', '')
	check_out = request.args.get('check_out','')
	room_type = request.args.get('room_type',None)

	# Validation
	check_in_dt = string_to_dt(check_in)
	check_out_dt = string_to_dt(check_out)
	is_room_type = validate_room_type(room_type)

	if (check_in_dt==None or check_out_dt == None):
		raise BadRequestError("Invalid Date")

	if is_room_type == False:
		raise BadRequestError("Invalid Room Type")

	_rooms = some_rooms(check_in_dt,check_out_dt,int(room_type))
	rooms = list()
	for _room in _rooms:
		room = marshal(_room,RoomOutput)
		rooms.append(room)
	return jsonify(success=True,rooms=rooms)

	