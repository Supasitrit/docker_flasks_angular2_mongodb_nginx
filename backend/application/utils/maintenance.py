from application.models.maintenance import *

def all_maintenances():
    res = Maintenance.objects().order_by('-created_at')
    return res

def getMaintenance(maintenance_id):
	return Maintenance.objects(id=maintenance_id).first()
