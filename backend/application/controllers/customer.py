from application import app
from flask import Flask, request, redirect, url_for,jsonify, g
from application.decorators.token import *
from flask_restful import marshal
from application.utils.date_time import *
from application.utils.customer import *
from application.forms.customer import *
from application.outputs.customer import *
from application.exceptions.simple_error import *


@app.route("/ams/customers",methods=["POST"])
@require_token
def new_customer():
	form = CustomerForm()
	_customer = Customer()
	_customer.name = form.name.data
	_customer.email = form.email.data
	_customer.phone = form.phone.data
	_customer.created_by = g.user
	_customer.created_at = dt_now()
	_customer.save()
	customer = marshal(_customer,CustomerOutput)
	return jsonify(success=True,customer=customer)

@app.route("/ams/customers",methods=["GET"])
@require_token
def list_customers():
	customers = list()
	_customers = list()
	_customers = all_customers()
	for _customer in _customers:
		resCustomer = getAvofCustomer(_customer)
		customer = marshal(resCustomer,CustomerOutput)
		customers.append(customer)
	return jsonify(success=True,customers=customers)

@app.route("/ams/customers/<customer_id>",methods=["GET"])
@require_token
def customer_detail(customer_id):
	_customer = getCustomerFromID(customer_id)
	if _customer:
		customer = marshal(_customer, CustomerDetailOutput)
		return jsonify(success=True,customer=customer)
	raise BadRequestError("Customer does not exist")

@app.route("/ams/customers/<customer_id>",methods=["PUT"])
@require_token
def edit_customer(customer_id):
	_customer =getCustomerFromID(customer_id)
	if not _customer:
		raise BadRequestError("Customer does not exist")
	form = CustomerForm(is_validate=False)
	_customer.name = form.name.data
	_customer.email = form.email.data
	_customer.phone = form.phone.data
	_customer.save()
	customer = marshal(_customer, CustomerOutput)
	return jsonify(success=True,customer=customer)

@app.route("/ams/customers/<customer_id>",methods=['DELETE'])
@require_token
def del_customer(customer_id):
	_customer = getCustomerFromID(customer_id)
	if _customer:
		_customer.delete()
		return jsonify(success=True)
	else:
		raise BadRequestError("Customer does not exist")