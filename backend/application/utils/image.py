import os
from werkzeug import secure_filename
from application import app
from application import dropbox_client
from flask import url_for
from application import dropbox
from application import photos
import random, string, base64


ALLOWED_EXTENSIONS = set([ 'png', 'jpg', 'jpeg', 'gif'])


def allowed_file(filename):
	return '.' in filename and \
		filename.rsplit('.', 1)[1] in ALLOWED_EXTENSIONS

def generate_image_name():
    res = None
    res = ''.join(random.choice(string.lowercase+string.uppercase) for i in range(10))
    return res

def upload_image(file,filename=None):
    if filename == None:
        filename = file.filename
    filename = secure_filename(filename)
    file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
    return filename
