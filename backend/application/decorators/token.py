from functools import wraps
from flask import g,request
from application.utils.user import *
from application.exceptions.simple_error import *

def require_token(fn):
    @wraps(fn)
    def decorated_function(*args, **kwargs):
        if 'Authorization' not in request.headers:
            raise BadRequestError("Missing access token")
        auth = request.headers.get('Authorization')
        email,password = decrypte_token(auth)
        g.user = isUserExist(email,password)
        if g.user == False:
            raise BadRequestError("Invalid access token")
        return fn(*args, **kwargs)
    return decorated_function