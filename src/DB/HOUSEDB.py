from flask import Flask, jsonify
import sqlite3
import os

app = Flask(__name__)

def get_db_connection():
    conn = sqlite3.connect('appdata.db')
    return conn

def initialize_db():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS power_data (
            id INTEGER PRIMARY KEY,
            power_left FLOAT
        )
    ''')
    conn.commit()

    test_data = [10.0, 13.0, 15.0, 85.0]
    cursor.executemany('INSERT INTO power_data (power_left) VALUES (?)', [(value,) for value in test_data])
    conn.commit()
    conn.close()

@app.route('/power_left')
def get_power_left():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT power_left FROM power_data ORDER BY id ASC')
    # Fetch all rows
    rows = cursor.fetchall()
    # Convert list of tuples to list of floats
    power_left_list = [row[0] for row in rows] if rows else []
    conn.close()
    return jsonify({'powerLeft': power_left_list})

def update_power_left(power_left):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('INSERT INTO power_data (power_left) VALUES (?)', (power_left,))
    conn.commit()
    conn.close()

initialize_db()

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
