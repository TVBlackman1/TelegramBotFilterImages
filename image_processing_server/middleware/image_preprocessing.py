from functools import wraps
from werkzeug.wrappers import Request, Response, ResponseStream
from flask import Flask
import numpy as np
import cv2.cv2 as cv


class ImagePreprocessing:
    def __init__(self, app):
        self.app = app

    def __call__(self, environ, start_response):
        request = Request(environ)

        data = request.json
        inp = np.asarray(data['image']['data'], dtype=np.uint8)
        img = cv.imdecode(inp, cv.IMREAD_COLOR)
        environ['img'] = img

        return self.app(environ, start_response)