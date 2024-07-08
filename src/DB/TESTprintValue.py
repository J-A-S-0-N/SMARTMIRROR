import sqlite3

def print_all_data():
    # Connect to the SQLite database
    conn = sqlite3.connect('arduino_data.db')
    cursor = conn.cursor()

    # Query to select all data from sensor_data table
    cursor.execute('SELECT * FROM sensor_data')

    # Fetch all rows from the query
    all_rows = cursor.fetchall()

    # Print the column names
    print("ID | Water Flow | Solar Panel Voltage | Capacitor Voltage | Overall Amperage")
    print("-" * 65)

    # Iterate over all the rows and print the data
    for row in all_rows:
        print(f"{row[0]:<3} | {row[1]:<10} | {row[2]:<19} | {row[3]:<17} | {row[4]:<16}")

    # Close the connection to the database
    conn.close()

if __name__ == "__main__":
    print_all_data()
