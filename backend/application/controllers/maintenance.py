from application import app
from flask import Flask, request, redirect, url_for,jsonify, g
from flask import send_from_directory
from application.decorators.token import *
from flask_restful import marshal
from application.utils.date_time import *
from application.utils.image import *
from application.outputs.maintenance import *
from application.utils.maintenance import *
from application.utils.room import *
from application.forms.maintenance import *
from application.exceptions.simple_error import *

serverUrl = "128.199.104.193"
# serverUrl = "localhost"

@app.route("/ams/maintenances",methods=["POST"])
@require_token
def create_maintenance():
	form = MaintenanceForm()
	_maintenance = Maintenance()
	if 'photo' in request.files:
		file = request.files['photo']
		img_url = upload_image(file,filename=file.filename)
		img_url = "http://"+serverUrl+"/ams/images/" + img_url
		_maintenance.img_url = img_url
	_maintenance.created_by = g.user
	_maintenance.created_at = dt_now()
	_maintenance.title = form.title.data
	_maintenance.cost = form.cost.data
	_maintenance.save()
	if form.room:
		_maintenance.room_name = form.room.name
		form.room.maintenance_history.append(_maintenance)
		form.room.modified_at = dt_now()
		form.room.save()
	_maintenance.save()
	maintenance = marshal(_maintenance,MaintenanceOutput)
	return jsonify(success=True,maintenance=maintenance)

@app.route("/ams/images/<filename>",methods=["GET"])
def get_image(filename):
	return send_from_directory(app.config['UPLOAD_FOLDER'],
                               filename)

@app.route("/ams/maintenances",methods=["GET"])
@require_token
def list_maintenances():
	maintenances = list()
	_maintenances = list()
	_maintenances = all_maintenances()
	for _maintenance in _maintenances:
		maintenance = marshal(_maintenance,MaintenanceOutput)
		maintenances.append(maintenance)
	return jsonify(success=True,maintenances=maintenances)

@app.route("/ams/maintenances/<maintenance_id>",methods=["GET"])
@require_token
def maintenance_detail(maintenance_id):
	_maintenance = getMaintenance(maintenance_id)
	if not _maintenance:
		raise BadRequestError("Maintenance does not exist")
	maintenance = marshal(_maintenance,MaintenanceOutput)
	return jsonify(success=True,maintenance=maintenance)


@app.route("/ams/maintenances/<maintenance_id>",methods=["PUT"])
@require_token
def edit_maintenance(maintenance_id):
	_maintenance = getMaintenance(maintenance_id)
	if not _maintenance:
		raise BadRequestError("Maintenance does not exist")
	form = MaintenanceForm()
	_room = getRoomDetail(_maintenance.room_name)
	if _room:
		_room.maintenance_history.remove(_maintenance)
		_room.save()
	if 'photo' in request.files:
		file = request.files['photo']
		img_url = upload_image(file,filename=file.filename)
		img_url = "http://"+serverUrl+"/ams/images/" + img_url
		_maintenance.img_url = img_url
	_maintenance.created_by = g.user
	_maintenance.modified_at = dt_now()
	_maintenance.title = form.title.data
	_maintenance.cost = form.cost.data
	_maintenance.save()
	if form.room:
		_maintenance.room_name = form.room.name
		form.room.maintenance_history.append(_maintenance)
		form.room.save()
	_maintenance.save()
	maintenance = marshal(_maintenance,MaintenanceOutput)
	return jsonify(success=True,maintenance=maintenance)

@app.route("/ams/maintenances/<maintenance_id>",methods=['DELETE'])
@require_token
def del_maintenance(maintenance_id):
	_maintenance = getMaintenance(maintenance_id)
	if _maintenance:
		_maintenance.delete()
		return jsonify(success=True)
	else:
		raise BadRequestError("Maintenance does not exist")

@app.route("/ams/rooms/<room_name>/maintenances",methods=["GET"])
@require_token
def list_maintenance_history(room_name):
	_room = getRoomDetail(room_name)
	if not _room:
		raise BadRequestError("This room does not exist")
	_maintenances = maintenance_history(room_name)
	maintenances = list()
	for _maintenance in _maintenances:
		maintenance = marshal(_maintenance,MaintenanceOutput)
		maintenances.append(maintenance)
	return jsonify(success=True,maintenances=maintenances)
