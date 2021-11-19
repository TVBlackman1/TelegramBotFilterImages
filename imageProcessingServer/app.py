from flask import Flask, request, jsonify
from middleware.image_preprocessing import ImagePreprocessing
# import cv2 as cv
import cv2.cv2 as cv
from controllers.ImageProcess import blur
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)

app.wsgi_app = ImagePreprocessing(app.wsgi_app)

@app.route('/api/process', methods=['POST'])
def process():
    img = request.environ['img']
    # request.json['options']['filter']
    newImg = blur(img)
    img_buff = cv.imencode('.png', newImg)[1]
    img_buff_arr = img_buff.tolist()

    return jsonify({
        'image': img_buff_arr
    })

@app.route('/hello', methods=['GET'])
def hello():
    return 'hello world'


if __name__ == '__main__':
    PORT = os.getenv('PORT')
    app.run(host='0.0.0.0', port=PORT)

