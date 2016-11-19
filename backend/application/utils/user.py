import random, string, base64
from application.exceptions.simple_error import *
from application.models.user import *

def generate_access_token(email,password):
    user = isUserExist(email,password)
    if user:
        return base64.urlsafe_b64encode("email"+email+"password"+password)
    return None

def decrypte_token(token):
    try:
        token_wb = token.split('bearer ')[1]
        token_wb = base64.urlsafe_b64decode(str(token_wb))
        attr_list = token_wb.split('password')
        email,password = attr_list[0],attr_list[1]
        email = email.split('email')[1]
        return email,password
    except:
        raise BadRequestError("Invalid access token")

def isUserExist(email,password):
    res = User.objects(email=email, password=password).first()
    if res!= (None,None):
        return res
    return False

def getUser(email):
    res = User.objects(email=email).first()
    return res

def isUserEmailExist(email):
    res = User.objects(email=email).first()
    if res != None:
        return True
    return False