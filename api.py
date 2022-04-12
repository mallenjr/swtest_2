from bmi import getBmi, getCategory
import json
import os
from flask_cors import CORS
from flask import Flask, request, Response, send_from_directory

app = Flask(__name__, static_folder='bmi-calc/build')
CORS(app)

@app.route('/api/bmi',methods = ['POST'])
def bmiApi():
    request_data = request.get_json()
    feet = inches = weight = None

    try:
        feet = request_data['feet']
        inches = request_data['inches']
        weight = request_data['weight']
    except Exception as e:
        return Response("{'error':'invalid request'}", status=400, mimetype='application/json')
    
    bmi = getBmi((feet, inches), weight)
    category = getCategory(bmi)
    response = {
        'bmi': bmi,
        'category': category
    }

    return Response(json.dumps(response), status=200, mimetype='application/json')

# Serve React App
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run('0.0.0.0', 4000)