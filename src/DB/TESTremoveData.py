import sqlite3

def delete_rows_by_id_range(db_file, start_id, end_id):
    """ Delete rows from the sensor_data table where the id is within a specified range """
    conn = sqlite3.connect(db_file)
    cursor = conn.cursor()
    try:
        # Deleting rows where the id is within the specified range
        cursor.execute("DELETE FROM sensor_data WHERE id BETWEEN ? AND ?", (start_id, end_id))
        conn.commit()  # Committing the changes to the database
        if cursor.rowcount == 0:
            print("No rows found in that range.")
        else:
            print(f"Rows deleted successfully. Rows affected: {cursor.rowcount}")
    except sqlite3.Error as e:
        print("Error occurred:", e)
    finally:
        conn.close()

db_path = 'arduino_data.db'
start_id_to_delete = 0  # Start of the ID range to delete
end_id_to_delete = 100   # End of the ID range to delete
delete_rows_by_id_range(db_path, start_id_to_delete, end_id_to_delete)
