from flask import request,jsonify
from application import app

def bad_request(message):
    response = jsonify({'message': message,'success':False})
    response.status_code = 200
    return response

class BadRequestError(ValueError):
    pass

@app.errorhandler(BadRequestError)
def bad_request_handler(error):
    return bad_request(error.message)