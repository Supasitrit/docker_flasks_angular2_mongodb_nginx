import os
from application import app
import unittest
import json

class FlaskrTestCase(unittest.TestCase):

	
    def setUp(self):
    	print "WHAT"
    	self.app = app.test_client()
    	self.base_url = '/ams'
    	self.token = None
    	print "WHAT EVEN"
    	

	def tearDown(self):
		pass

	def get(self,url,args=None,token=self.token):
		print ""
		abs_url = self.base_url + url
		print "Testing Url: " + abs_url

		res = self.app.get(abs_url,data=args,headers=token)
		res = res.data
		
		print "Response: " + res
		return json.loads(res)

	def post(self,url,args=None,token=self.token):
		print ""
		abs_url = self.base_url + url
		print "Testing Url: " + abs_url

		res = self.app.post(abs_url,data=args,headers=token)
		res = res.data		

		print "Response: " + res
		return json.loads(res)


	# Testing Token
	def get_token(self,email,password):
		res = self.post("/login",dict(email=email,password=password))
		return res

	def testGet_token(self):
		print "ASDF"
		# Case I, Invalid Email and Password
		res = get_token("","")
		assert res.success == False
		
		# Case II, Invalid Email
		res = get_token("","SPLUG")
		assert res.success == False

		# Case III, Invalid Password
		res = get_token("phillip@sih.com","")
		assert res.success == False

		# Case IV, Valid Credentials
		res = get_token("phillip@sih.com","SPLUG")
		assert res.success == True
		self.token = res.token



	# Testing Room
	def list_rooms(self):
		res = self.get("/rooms")
		return res

	def test_list_rooms(self):
		res = list_rooms()
		return 

	def room_detail(self,room_name):
		res = self.get("/"+ room_name)
		return res

	def room_availibity(self,start_date,end_date):
		res = self.get("/rooms/available",dict(start_date=start_date,end_date=end_date))
		return res


	# # Testing Booking
	def list_bookings(self):
		res = self.get("/bookings")
		return res

	def get_booking_detail(self,booking_id):
		res = self.get("/bookings/"+booking_id)
		return res

	def get_booking_activity(self,start_date,end_date):
		res = self.get("/bookings/activity",dict(start_date=start_date,end_date=end_date))
		return res

	def create_booking(self,request_dict):
		res = self.post("/bookings",request_dict)
		return res

	def edit_booking(self):
		pass

	def del_booking(self):
		pass

	def booking_history(self,room_name):
		pass


	# # Testing Customer
	def list_customers(self):
		res = self.get("/customers")
		return res

	def get_customer_detail(self,customer_id):
		res = self.get("/customers/"+customer_id)
		return res

	def edit_customer(self,customer_id):
		pass

	def del_customer(self,customer_id):
		pass

	def create_customer(self,request_dict):
		res = self.post("/customers",request_dict)
		return res

	# # Testing Maintenance
	# def list_maintenances(self):
	# 	res = self.get("/maintenances")
	# 	return res

	# def edit_maintenance(self,maintenance_id):
	# 	pass

	# def del_maintenance(self,maintenance_id):
	# 	pass

	# def create_maintenance(self,request_dict):
	# 	res = self.post("/maintenances",request_dict)
	# 	return res

	# def maintenance_history(self,room_name):
	# 	pass


if __name__ == '__main__':
    unittest.main()