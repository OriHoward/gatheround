from flask import Flask
from flask_restful import Resource, Api, reqparse
from Resources.Event import Event

# https://flask-restful.readthedocs.io/en/latest/quickstart.html
app = Flask(__name__)
api = Api(app)


api.add_resource(Event, '/events')


if __name__ == '__main__':
    app.run(debug=True)
