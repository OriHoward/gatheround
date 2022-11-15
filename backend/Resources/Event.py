from flask_restful import Resource


class Event (Resource):
    def get(self):
        return {"a": "1"}

    def post(self):
        return {'status': "accepted"}
