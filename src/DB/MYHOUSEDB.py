#for js value display

import sqlite3
import os
from flask import Flask, jsonify
from flask_cors import CORS
from datetime import datetime, timedelta

app = Flask(__name__)
CORS(app)

global conn
conn = sqlite3.connect('arduino_data.db')

def fetchLatestValues():
    cursor = conn.cursor()
    cursor.execute('''
        SELECT water_flow, solar_panel_v, capacitor_v, overall_a 
        FROM sensor_data 
        ORDER BY id DESC 
        LIMIT 1
    ''')
    latest_data = cursor.fetchone()  
    if latest_data:
        return latest_data
    else:
        logging.info("No data available in the database.")
        return None

def SendToCentDB():
    pass

def change_Value():
    pass

def get_db_connection():
    return sqlite3.connect('arduino_data.db', check_same_thread=False)

@app.route('/overallPower')
def return_overallW():
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute('''
        SELECT overall_a, capacitor_v
        FROM sensor_data
        ORDER BY id DESC
        LIMIT 1
    ''')
    latest_data = cursor.fetchone()
    cursor.close()
    conn.close()

    if latest_data:
        overall_a, capacitor_v = latest_data
        power = overall_a * capacitor_v
        return jsonify({"power": power})
    else:
        return jsonify({"error": "No data available"}), 404


@app.route('/liveElectValue')
def return_electricity_live_data():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT solar_panel_v FROM sensor_data")
    rows = cursor.fetchall()
    values = [row[0] for row in rows] 
    cursor.close()
    conn.close()
    return jsonify({"all_values": values})


@app.route('/liveWaterValue')
def return_water_live_data():
    try: 
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT water_flow FROM sensor_data")
        rows = cursor.fetchall()
        values = [row[0] for row in rows] 
        cursor.close()
        conn.close()
        return jsonify({"all_values": values})
    except Exception as e:
        print("An error occurred:", e)
        return jsonify({"error": "An error occurred retrieving data"}), 500

@app.route('/electricity')
def return_electricity_data():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT water_flow FROM sensor_data")
    water_flow = cursor.fetchone()[0] if cursor.fetchone() else 0
    cursor.close()
    conn.close()
    return jsonify({"value": water_flow})


@app.route('/latestWaterFlow')
def return_latest_water_flow():
    conn = get_db_connection()  # Get a new database connection
    cursor = conn.cursor()
    try:
        # Execute the SQL query to fetch the latest water flow value
        cursor.execute('''
            SELECT water_flow FROM sensor_data
            ORDER BY id DESC
            LIMIT 1
        ''')
        latest_data = cursor.fetchone()  # Fetch the first (latest) row
    except sqlite3.Error as e:
        # If an error occurs, print it and return an error message
        print("Database error:", e)
        return jsonify({"error": "Database error occurred"}), 500
    finally:
        # Always close the database connection
        cursor.close()
        conn.close()

    # Check if we got data back
    if latest_data:
        water_flow = latest_data[0]  # Extract water flow from the tuple
        return jsonify({"water_flow": water_flow})
    else:
        # If no data was found, return an appropriate message
        return jsonify({"error": "No water flow data available"}), 404

@app.route("/powerTrend")
def power_trend():
    conn = get_db_connection()
    cursor = conn.cursor()

    today = datetime.now().date()
    yesterday = today - timedelta(days=1)

    try:
        # Initialize variables to store total power and count of records for each day
        today_total_power = 0
        today_count = 0
        yesterday_total_power = 0
        yesterday_count = 0

        # Fetch records for yesterday and today
        for day in [yesterday, today]:
            cursor.execute('''
                SELECT overall_a * capacitor_v
                FROM sensor_data
                WHERE date(timestamp) = ?
            ''', (day.strftime('%Y-%m-%d'),))

            rows = cursor.fetchall()

            # Compute total power and count of records for the day
            total_power = sum(row[0] for row in rows)
            count = len(rows)

            # Update variables based on the day
            if day == yesterday:
                yesterday_total_power = total_power
                yesterday_count = count
            else:
                today_total_power = total_power
                today_count = count

        cursor.close()
        conn.close()

        # Calculate averages
        yesterday_avg_power = yesterday_total_power / yesterday_count if yesterday_count > 0 else 0
        today_avg_power = today_total_power / today_count if today_count > 0 else 0

        # Calculate the percentage change
        if yesterday_avg_power == 0:
            return jsonify({"error": "Yesterday's average power was 0, making change calculation impossible"}), 400
        
        change_percent = ((today_avg_power - yesterday_avg_power) / yesterday_avg_power) * 100
        if change_percent > 0:
            message = f"Average power usage went up by {change_percent:.2f}% compared to yesterday."
        else:
            message = f"Average power usage went down by {abs(change_percent):.2f}% compared to yesterday."

        return jsonify({"message": message})

    except sqlite3.Error as e:
        print("Database error:", e)
        return jsonify({"error": "Database error occurred: " + str(e)}), 500



if __name__ == "__main__":
    app.run(debug=True)