import sqlite3
import random
import time

# Connect to SQLite database (or create it if it doesn't exist)
conn = sqlite3.connect('arduino_data.db')
cursor = conn.cursor()

# Create a new table
cursor.execute('''
CREATE TABLE IF NOT EXISTS sensor_data (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    water_flow REAL,
    solar_panel_v REAL,
    capacitor_v REAL,
    overall_a REAL
)
''')

# Commit the changes
conn.commit()

def insert_random_data():
    """
    Inserts random data into the sensor_data table.
    """
    water_flow = random.randint(0, 100)  # Random float between 0 and 100
    solar_panel_v = random.randint(0, 30)  # Random float between 0 and 30 volts
    capacitor_v = random.randint(0, 25)  # Random float between 0 and 25 volts
    overall_a = random.randint(0, 10)  # Random float between 0 and 10 amperes

    # Inserting the data into the table
    cursor.execute('''
    INSERT INTO sensor_data (water_flow, solar_panel_v, capacitor_v, overall_a)
    VALUES (?, ?, ?, ?)
    ''', (water_flow, solar_panel_v, capacitor_v, overall_a))

    # Commit the changes
    conn.commit()

try:
    while True:
        insert_random_data()
        print("Data inserted")
        time.sleep(5)  # Sleep for 5 seconds before inserting next data
except KeyboardInterrupt:
    print("Stopped by user.")
finally:
    # Close the connection to the database when done
    conn.close()
