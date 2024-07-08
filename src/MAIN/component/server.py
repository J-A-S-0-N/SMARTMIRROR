from flask import Flask, jsonify
import random
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

test_data = [random.randint(0, 100) for _ in range(6)]
print(test_data)
print(type(test_data))

def arr_append(value):
    test_data.append(value)

@app.route('/data')
def get_data():
    # Simulate data generation
    data = {
        "labels": ["January", "February", "March", "April", "May", "June"],
        "datasets": [{
            "data": test_data
        }]
    }
    arr_append(random.randint(0, 100))
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)