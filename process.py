import json
import os
from flask_cors import CORS
from threading import Thread
import requests
from flask import Flask, request, Response, send_from_directory

app = Flask(__name__, static_folder='bmi-calc/build')
CORS(app)

def get_image_tag(image):
    tag = None
    with open('environment.json', 'r+') as f:
        data = json.load(f)
        tag = data[image]

    return tag

def bootstrap():
    bmicalc_tag = get_image_tag("bmicalc")
    try:
        os.system("docker stop bmicalc")
        os.system("""docker pull majrlzr/bmicalc:latest""")
        os.system("""docker run -d --name bmicalc -p 4000:4000 majrlzr/bmicalc:latest""")
    except Exception as e:
        print('Could not deploy container')

def update_environment(image, tag):
    with open('environment.json', 'r+') as f:
        data = json.load(f)
        data[image] = tag
        f.seek(0)
        json.dump(data, f, indent=4)
        f.truncate()

def handle_deploy(new_tag):
    update_environment("bmicalc", new_tag)
    try:
        os.system("docker stop bmicalc")
        os.system("""docker pull majrlzr/bmicalc:latest""")
        os.system("""docker run -d --name bmicalc -p 4000:4000 majrlzr/bmicalc:latest""")
    except Exception as e:
        print('Could not deploy container')

@app.route('/deploy',methods = ['POST'])
def deploy():
    response = requests.get('https://api.github.com/meta')

    if response.status_code != 200:
        return Response("{'error':'internal exception'}", status=500, mimetype='application/json')

    data = json.load(response.text)

    if request.remote_addr not in data['actions']:
        return Response("{'error':'invalid ip'}", status=500, mimetype='application/json')

    data = request.get_json()
    new_tag = data["new_tag"]

    t = Thread(target = handle_deploy, args =(new_tag))
    t.start()
    return ""

if __name__ == '__main__':
    bootstrap()
    app.run('0.0.0.0', 4001)