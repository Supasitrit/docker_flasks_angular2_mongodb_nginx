from application.models.customer import *

def all_customers():
    res = Customer.objects().order_by('name')
    return res

def getCustomer(email):
	res = Customer.objects(email=email).first()
	return res

def getCustomerFromID(id):
	res = Customer.objects(id=id).first()
	return res


# def booking_history(email):
#     result = Room.objects(name=room_name).only("booking_history").first().select_related()['booking_history']
#     return result

# def maintenance_history(room_name):
#     result = Room.objects(name=room_name).only("maintenance_history").first().select_related()['maintenance_history']
#     return result
