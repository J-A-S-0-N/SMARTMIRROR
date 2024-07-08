import sqlite3
import flask_cors
import jsonify

app = Flask(__name__)
CORS(app)

power = 10;

def modify(Value):
    power = Value

@route("/returnHouse1Value")
def returnValue():
    data = {
        "power": power
    }
    return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True)