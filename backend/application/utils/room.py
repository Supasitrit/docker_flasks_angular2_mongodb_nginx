from application.models.room import *
from application.utils.booking import *
from application.utils.date_time import *
from application import Q
import datetime

def all_rooms():
    res = Room.objects()
    return res

def getRoomDetail(room_name):
    res = Room.objects(name=room_name).first()
    if res == None:
        return res
    current_booking = getCurrentBooking(dt_now(),dt_now(),room_name)
    if current_booking:
        res.current_booking = current_booking
        res.is_available = False
    else:
        res.current_booking = None
        res.is_available = True
    return res

def getAvOfRoom(res):
    current_booking = getCurrentBooking(dt_now(),dt_now(),res.room_name)
    if current_booking:
        res.current_booking = current_booking
        res.is_available = False
    else:
        res.current_booking = None
        res.is_available = True
    return res

def booking_history(room_name):
    result = Room.objects(name=room_name).only("booking_history").first().select_related()['booking_history']
    return result

def maintenance_history(room_name):
    result = Room.objects(name=room_name).only("maintenance_history").first().select_related()['maintenance_history']
    return result

def some_rooms(check_in,check_out,room_type):
    res = getBookedRoomsForAvailible(check_in,check_out)
    list_of_rooms_booked = list()
    for booking in res:
        list_of_rooms_booked.append(booking.to_mongo()['room_name'])
    # result = Room.objects(Q(room_type=room_type) & Q(room_state__ne=2) & Q(name__nin=res))
    result = Room.objects(name__nin=list_of_rooms_booked)
    return result

def validate_room_type(room_type):
    try:
        room_type = int(room_type)
        if room_type < 0 or room_type > 6:
            return False
        else:
            return True
    except:
        return False