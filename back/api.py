import flask
import json
from flask import render_template
import random as rd
from flask import request
import numpy as np
from cnn import ConvNet
import base64
import cv2
from tensorflow.keras import backend as K
from tensorflow.keras.models import model_from_json

from flask_cors import CORS, cross_origin

app = flask.Flask(__name__)
CORS(app)

imsize = 28


@app.route("/api")
def index():
    return render_template('index.html')


@app.route("/api/guessmyhiragana", methods=['POST'])
@cross_origin()
def main():
    jsonResponse = json.loads(request.data.decode('utf-8'))
    image = jsonResponse['image']
    png_recovered = base64.decodestring(image.split(',')[1])
    f = open("temp.png", "w")
    f.write(png_recovered)
    f.close()
    tab = cv2.bitwise_not(cv2.imread("temp.png", 0))
    new = cv2.resize(tab, (imsize, imsize))
    cv2.imwrite("visu.png", new)

    json_file = open('model.json', 'r')
    loaded_model_json = json_file.read()
    json_file.close()
    loaded_model = model_from_json(loaded_model_json)

    loaded_model.load_weights("model.h5")

    reseau = ConvNet(imsize, imsize)
    reseau.model = loaded_model

    response = flask.jsonify({
        'romanji': reseau.prediction(new),
        # 'image': jsonResponse['image']
    })
    K.clear_session()

    return response


@app.route('/api/health', methods=['GET'])
def test():
    return flask.jsonify({'hello': 'world'})

    # from flask_cors import CORS, cross_origin
    # CORS(app)
    # @app.route("/<path:fullurl>", methods=['GET'])
    # @cross_origin()
    # def main(fullurl):
    #
    #     height, width, n = [int(e) for e in fullurl.split('/')]
    #     svg = motif(height, width, n)
    #     response = flask.jsonify({'svg': svg})
    #     return response
