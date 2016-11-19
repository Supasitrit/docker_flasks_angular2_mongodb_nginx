import datetime
import time

def timestamp_to_dt(created_time):
    return datetime.datetime.utcfromtimestamp(int(created_time))

def dt_now():
    return datetime.datetime.utcnow()

def string_to_dt(date):
	try:
		return datetime.datetime.strptime(date, "%Y-%m-%d")
	except:
		try:
			return datetime.datetime.strptime(date, "%Y-%m-%dT00:00:00")
		except Exception, e:
			return None

def dt_to_string(date):
	try:
		return date.strftime('%Y-%m-%d')
	except:
		return None

def daterange(start_date, end_date):
    for n in range(int ((end_date - start_date).days)):
        yield start_date + datetime.timedelta(n)