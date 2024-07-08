import serial
import sqlite3
import logging

# Setup logging to include file logging
logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s',
                    filename='arduino_data.log', filemode='a')

# Setup serial connection to Arduino
arduino = serial.Serial(port='/dev/cu.usbserial-10', baudrate=9600, timeout=0.1)

# Connect to SQLite database
conn = sqlite3.connect('arduino_data.db')
cursor = conn.cursor()

# Ensure the table is set up correctly
cursor.execute('''
    CREATE TABLE IF NOT EXISTS sensor_data (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        water_flow REAL,
        solar_panel_v REAL,
        capacitor_v REAL,
        overall_a REAL
    )
''')

def receive_data():
    while True:
        try:
            msgRD = arduino.readline()
            msgRD = msgRD.decode('utf-8').strip()
            print(msgRD)
            if msgRD:
                data = [float(item) for item in msgRD.split()]
                if len(data) == 4:
                    cursor.execute(
                        "INSERT INTO sensor_data (water_flow, solar_panel_v, capacitor_v, overall_a) VALUES (?, ?, ?, ?)",
                        data
                    )
                    conn.commit()
                    logging.info(f"Data Stored: {data}")
                else:
                    logging.warning("Incomplete data received: " + msgRD)
        except UnicodeDecodeError:
            logging.error("Data received is not UTF-8.")
        except ValueError:
            logging.error("Data conversion error: Could not convert data to float.")
        except Exception as e:
            logging.error(f"An unexpected error occurred: {e}")
            break

if __name__ == "__main__":
    try:
        receive_data()
    except Exception as e:
        logging.error(f"Fatal error in main loop: {e}")
    finally:
        cursor.close()
        conn.close()
        arduino.close()