import os
from application import app,db
from flask_testing import TestCase
import json
import unittest
import random

class AMSTestCase(TestCase):

	def create_app(self):
		return app

	def setUp(self):
		self.app = app.test_client()
		self.base_url = '/ams'

	def setToken(self,access_token):
		token = {"Authorization": access_token}

	def getToken(self):
		return {"Authorization": "bearer ZW1haWxleGFtcGxlQGV4YW1wbGUuY29tcGFzc3dvcmQxMjM0NTY3OA=="}

	def tearDown(self):
		pass

	def get(self,url,args=None,token=None):
		abs_url = self.base_url + url
		print "Testing Url: " + abs_url
		res = self.client.get(abs_url,query_string=args,headers=self.getToken())
		res = res.data
		print "Response: " + res
		return json.loads(res)

	def post(self,url,args=None,token=None):
		abs_url = self.base_url + url
		print "Testing Url: " + abs_url
		res = self.client.post(abs_url,data=args,headers=self.getToken())
		res = res.data	

		print "Response: " + res
		return json.loads(res)

	def put(self,url,args=None,token=None):
		abs_url = self.base_url + url
		print "Testing Url: " + abs_url
		res = self.client.put(abs_url,data=args,headers=self.getToken())
		res = res.data	

		print "Response: " + res
		return json.loads(res)

	def delete(self,url,args=None,token=None):
		abs_url = self.base_url + url
		print "Testing Url: " + abs_url
		res = self.client.delete(abs_url,data=args,headers=self.getToken())
		res = res.data	

		print "Response: " + res
		return json.loads(res)

	################## Testing Token ######################
	def get_token(self,email,password):
		res = self.post("/login",dict(email=email,password=password))
		return res

	def test_get_token(self):
		# Case I, Invalid Email and Password
		res = self.get_token("","")
		assert res['success'] == False
		
		# Case II, Invalid Email
		res = self.get_token("","123456")
		assert res['success'] == False

		# Case III, Invalid Password
		res = self.get_token("example@example.com","")
		assert res['success'] == False

		# Case IV, Valid Credentials
		res = self.get_token("example@example.com","12345678")
		assert res['success'] == True

		# Case V, Invalid Credentials
		res = self.get_token("aasdf","asdfasdf")
		assert res['success'] == False
		# self.setToken(res['access_token'])

	################## Testing Room ######################
	def list_rooms(self):
		res = self.get("/rooms")
		return res

	def create_room(self,building,room_number,room_state=2,room_type=1):
		request = {
			"building": building,
			"room_number": room_number,
			"room_state": room_state
		}
		res = self.post("/rooms",request)
		return res

	def test_create_room(self):
		# Case I, Completed Form
		res = self.create_room("B","101")
		assert res['success'] ==True
		
		res_room = res['room']
		expected_response = {
			'name': "B101",
			'building':"B",
			'room_number':"101",
			"room_state": 2
		}

		assert res_room == expected_response

		# Case II, Rejecting Duplicates
		res = self.create_room("B","101")
		assert res['success'] == False

		# Case III, Rejecting invalid room state
		res = self.create_room("E","201",6)
		assert res['success'] == False


	def test_list_rooms(self):
		self.create_room("A","301")
		self.create_room("C","401")
		self.create_room("D","201")
		res = self.list_rooms()
		assert res['success'] == True
		res_rooms = res['rooms']
		assert len(res_rooms) >= 3

	def edit_room(self,room_name,room_state):
		request = {
			"room_state": room_state
		}
		res = self.put("/rooms/"+room_name,request)
		return res

	def test_edit_room(self):
		# Case I, Invalid Room Name
		res = self.edit_room("asdf",2)
		assert res['success'] == False

		res = self.list_rooms()
		res_rooms = res['rooms']
		random_room = random.choice(res_rooms)
		random_room_state = random.randint(1,3)
		expected_response = {
			'name': random_room['name'],
			'building': random_room['building'],
			'room_state': random_room_state,
			'room_number': random_room['room_number']
		}

		# Case II, Valid Params
		res = self.edit_room(random_room['name'],random_room_state)
		assert res['room'] == expected_response
		assert res['success'] == True

		# Case III, Rejecting invalid room state
		res = self.edit_room(random_room['name'],6)
		assert res['success'] == False


	def room_detail(self,room_name):
		res = self.get("/rooms/"+ room_name)
		return res

	def test_room_detail(self):
		# No extra params
		res = self.list_rooms()
		res_rooms = res['rooms']
		random_room = random.choice(res_rooms)
		res = self.room_detail(random_room['name'])
		print res
		print "OMDF"
		res_room = res['room']
		assert res['success'] == True
		expected_response = {
			"booking_history": [],
			"building": res_room['building'],
			"current_booking": {
				"booking_id": None,
				"check_in": None,
				"check_out": None,
				"confirmed": False,
				"customers": None,
				"room_name": None
			},
			"maintenance_history": [],
			"name": res_room['name'],
			"room_number": res_room['room_number'],
			"room_state": res_room['room_state']
		}
		del res_room['modified_at']
		assert res_room == expected_response

		# Invalid Room Name
		res = self.room_detail("123")
		assert res['success'] == False

	def room_availibity(self,check_in,check_out,room_type):
		request = {
			'check_in': check_in,
			'check_out': check_out,
			'room_type': room_type
		}
		res = self.get("/rooms/availibity",request)
		return res

	def test_room_availibility(self):
		# 7 Cases
		pass

	################## Testing Customer ######################

	def list_customers(self):
		res = self.get("/customers")
		return res

	def test_list_customers(self):
		self.create_customer("Phillip","vorathep055@gmail.com","0895535335")
		self.create_customer("Phillip1","vorathep0535@gmail.com","0895535335")
		self.create_customer("Phillip2","vorathep0455@gmail.com","0895535335")
		res = self.list_customers()
		assert res['success'] == True
		res_customers = res['customers']
		assert len(res_customers) >= 3


	def get_customer_detail(self,customer_id):
		res = self.get("/customers/"+customer_id)
		return res

	def edit_customer(self,customer_id,name,email,phone):
		request = {
			"name": name,
			"email": email,
			"phone": phone
		}
		res = self.put("/customers/"+customer_id,request)
		return res

	def delete_customer(self,customer_id):
		res = self.delete("/customers/"+customer_id)
		return res

	def create_customer(self,name,email,phone):
		request = {
			"name": name,
			"email": email,
			"phone": phone
		}
		res = self.post("/customers",request)
		return res

	def test_create_customer(self):
		# Case I, Valid Params
		res = self.create_customer("Phillip","phillip@gmail.com","08644343434")
		assert res['success'] == True
		res_customer = res['customer']
		expected_response = {
			"name": "Phillip",
			"email": "phillip@gmail.com",
			"phone": "08644343434",
			"customer_state": 2
		} 
		del res_customer['customer_id']
		del res_customer['created_at']
		print res_customer
		print "BUG"
		assert res_customer == expected_response

		# Case II, Avoid Duplicates by email
		res = self.create_customer("Phillipe","phillip@gmail.com","0864043434")
		assert res['success'] == False

	def test_edit_customer(self):
		self.create_customer("Phillip","vorathep055@gmail.com","0895535335")
		self.create_customer("Phillip1","vorathep0535@gmail.com","0895535335")
		self.create_customer("Phillip2","vorathep0455@gmail.com","0895535335")
		# Case I, Invalid CustomerID
		res = self.edit_customer("582408edb67d313ae35872f3","asdf","vo@gmail.com","0864043334")
		assert res['success'] == False


		res = self.list_customers()
		res_customers = res['customers']
		random_customer = random.choice(res_customers)
		expected_response = {
			'name': random_customer['name'],
			'email': "vo@gmail.com",
			'phone': random_customer['phone'],
		}

		# Case II, Valid Params
		res = self.edit_customer(random_customer['customer_id'],random_customer['name'],"vo@gmail.com",random_customer['phone'])
		expected_response = {
			'name': random_customer['name'],
			'email': "vo@gmail.com",
			'phone': random_customer['phone'],
			'customer_state': random_customer['customer_state']
		}
		res_customer = res['customer']
		del res_customer['customer_id']
		del res_customer['created_at']
		assert res_customer == expected_response
		assert res['success'] == True

		# Case III, Rejecting duplicates
		# random_customer2 = random.choice(res_customers)
		# res = self.edit_customer(random_customer['customer_id'],random_customer['name'],random_customer2['email'],random_customer['phone'])
		# assert res['success'] == False

	def test_delete_customer(self):
		# Case I, Valid CustomerID
		res = self.list_customers()
		res_customers = res['customers']
		before = len(res_customers)
		random_customer = random.choice(res_customers)
		res = self.delete_customer(random_customer['customer_id'])
		assert res['success'] == True
		res = self.list_customers()
		res_customers = res['customers']
		after = len(res_customers)
		assert (before-1) == after
		res = self.get_customer_detail(random_customer['customer_id'])
		assert res['success'] == False

		# Case II, Invalid CustomerID
		res = self.delete_customer(random_customer['customer_id'])
		assert res['success'] == False

	def test_customer_detail(self):
		res = self.list_customers()
		res_customers = res['customers']
		random_customer = random.choice(res_customers)
		res = self.get_customer_detail(random_customer['customer_id'])
		res_customer = res['customer']
		assert res['success'] == True
		expected_response = {
			"name": res_customer['name'],
			"phone": res_customer['phone'],
			"email": res_customer['email'],
			"customer_id": res_customer['customer_id'],
    		"customer_state": res_customer['customer_state']
		}
		del res_customer['modified_at']
		del res_customer['created_at']
		del res_customer['facebook']
		del res_customer['created_by']
		assert res_customer == expected_response
		assert res['success'] == True

		res = self.get_customer_detail("582408edb67d313ae35872f3")
		assert res['success'] == False

	################## Testing Booking ######################

	def list_bookings(self):
		res = self.get("/bookings")
		return res

	def test_list_customers(self):
		res =self.list_bookings()
		assert res['success'] == True
		assert len(res['bookings']) >= 0
	# def test_list_bookings(self):


	# def get_booking_detail(self,booking_id):
	# 	res = self.get("/bookings/"+booking_id)
	# 	return res

	def test_create_booking(self):
		# Correct Flow
		self.create_room("E","201")
		self.create_room("E",'302')

		# Find available rooms
		start_date = "2017-01-01"
		end_date = "2017-12-31"
		room_type = 2
		res = self.room_availibity(start_date,end_date,room_type)

		res_rooms = res['rooms']

		self.create_customer("Vikky","vikky@gmail.com","0895535335")
		self.create_customer("Vikky2","vikky2@gmail.com","0895535335")
		self.create_customer("Vikky3","vikky3@gmail.com","0895535335")
		res = self.list_customers()
		res_customers = res['customers']

		customer_ids = ""
		for i in res_customers:
			customer_ids += i['customer_id']
			customer_ids += ","

		deposit = 20000
		ppm = 8000
		room_name = "E201"

		confirmed = bool(random.getrandbits(1))

		res = self.create_booking(start_date,end_date,12000.00,7000.00,customer_ids,room_name,room_type,confirmed)
		assert res['success'] == True
		res_booking = res['booking']
		res_customers = res_booking['customers']
		assert len(res_customers) == 3

		assert res_booking['check_in'][0:10] == start_date
		assert res_booking['check_out'][0:10] == end_date

	def del_booking(self,booking_id):
		res = self.delete("/bookings/"+booking_id)
		return res

	def test_delete_booking(self):
		# Case I, Valid CustomerID
		res = self.list_bookings()
		res_bookings = res['bookings']
		before = len(res_bookings)
		random_booking = random.choice(res_bookings)
		res = self.del_booking(random_booking['booking_id'])
		assert res['success'] == True
		res = self.list_bookings()
		res_bookings = res['bookings']
		after = len(res_bookings)
		assert (before-1) == after
		res = self.get_booking_detail(random_booking['booking_id'])
		assert res['success'] == False

		# Case II, Invalid CustomerID
		res = self.del_booking(random_booking['booking_id'])
		assert res['success'] == False



	# def test_edit_booking(self):
	# 	res = self.edit_booking()
	# 	pass

	# def test_del_booking(self):
	# 	res = self.del_booking()
	# 	pass

	def test_booking_detail(self):
		res = self.list_bookings()
		res_bookings = res['bookings']
		random_booking = random.choice(res_bookings)
		res = self.get_customer_detail(random_booking['customer_id'])
		res_booking = res['booking']
		assert res['success'] == True
		# expected_response = {
		# 	"name": res_booking['name'],
		# 	"phone": res_booking['phone'],
		# 	"email": res_booking['email'],
		# 	"customer_id": res_booking['customer_id'],
  #   		"customer_state": res_booking['customer_state']
		# }
		# del res_booking['modified_at']
		# del res_booking['created_at']
		# del res_booking['facebook']
		# del res_booking['created_by']
		assert res_booking == expected_response
		assert res['success'] == True

		res = self.get_customer_detail("582408edb67d313ae35872f3")
		assert res['success'] == False

	def get_booking_activity(self,start_date,end_date):
		request = {
			'start_date': start_date,
			'end_date': end_date
		}
		res = self.get("/bookings/activity",request)
		return res

	def create_booking(self,check_in,check_out,deposit,ppm,customer_ids,room_name,room_type,confirmed):
		request = {
			"check_in": check_in,
			"check_out": check_out,
			"deposit": deposit,
			"ppm":ppm,
			"customer_ids":customer_ids,
			"room_name": room_name,
			"room_type": room_type,
			"confirmed": confirmed
		}
		res = self.post("/bookings",request)
		return res

	def edit_booking(self,booking_id,check_in,check_out,deposit,ppm,customer_ids,room_name,room_type,confirmed):
		request = {
			"check_in": check_in,
			"check_out": check_out,
			"deposit": deposit,
			"ppm":ppm,
			"customer_ids":customer_ids,
			"room_name": room_name,
			"room_type": room_type,
			"confirmed": confirmed
		}
		res = self.put("/bookings/" + booking_id,request)
		return res

	def booking_history(self,room_name):
		res = self.get("/rooms/"+room_name+"/bookings")
		return res

	def get_booking_detail(self,booking_id):
		res = self.get("/bookings/"+booking_id)
		return res

	################## Testing Maintenance ######################



if __name__ == '__main__':
	token = None
	unittest.main()