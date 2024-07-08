import sqlite3
import flask_cors
import jsonify

app = Flask(__name__)
CORS(app)

power = 0;

def modify(Value):
    power = Value

@route("/returnHouse2Value")
def returnValue():
    data = {
        "power": power
    }
    return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True)