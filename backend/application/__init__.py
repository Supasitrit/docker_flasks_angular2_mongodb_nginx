from flask import Flask,jsonify
from flask_mongoengine import MongoEngine
from mongoengine.queryset.visitor import Q
from flask_uploads import UploadSet,configure_uploads,IMAGES
from flask_mail import Message, Mail
import dropbox
mail = Mail()
app = Flask(__name__)
app.config.from_object('config')
db = MongoEngine(app)
photos = UploadSet('photos', IMAGES)
pdfs = UploadSet('pdfs')
configure_uploads(app, (photos,pdfs))



dropbox_client = dropbox.Dropbox("pZwGArtMEhAAAAAAAAAAfJ61P4_f4ssSktOs9U7Qwc3NLojePwQUTtjB046Tam8W")

@app.route("/ams/",methods=["GET"])
def status():
    return jsonify(status=True)

from application.controllers.room import *
from application.controllers.token import *
from application.controllers.customer import *
from application.controllers.booking import *
from application.controllers.maintenance import *