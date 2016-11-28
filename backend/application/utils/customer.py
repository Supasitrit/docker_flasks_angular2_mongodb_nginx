from application.models.customer import *
from application.utils.booking import *
def all_customers():
    res = Customer.objects().order_by('name')
    return res

def getCustomer(email):
    res = Customer.objects(email=email).first()
    if res == None:
        return res
    current_booking = customerBooking(dt_now(),dt_now(),res)
    if current_booking:
        res.current = True
    else:
        res.current = False
    return res

def getAvofCustomer(customer):
    current_booking = customerBooking(dt_now(),dt_now(),customer)
    if current_booking:
        customer.current = True
    else:
        customer.current = False
    return res

def getCustomerFromID(id):
	res = Customer.objects(id=id).first()
	return res

def customerBooking(check_in,check_out,customer):
	res = Booking.objects(Q(check_out__gt=check_in)&Q(check_in__lt=check_out)&Q(customers__in=customer._id)).first()
	return res


# def booking_history(email):
#     result = Room.objects(name=room_name).only("booking_history").first().select_related()['booking_history']
#     return result

# def maintenance_history(room_name):
#     result = Room.objects(name=room_name).only("maintenance_history").first().select_related()['maintenance_history']
#     return result
