from flask import Flask, request, jsonify
from flask_cors import CORS
from db import get_db_connection

app = Flask(__name__)
CORS(app)

@app.route('/tasks', methods=['GET'])
def get_tasks():
    """
    Get all tasks.
    """
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM task WHERE status = 1")
    tasks = cursor.fetchall()
    conn.close()
    
    return jsonify([{
        "id": task[0], 
        "task_name": task[1], 
        "task_description": task[2], 
        "status": task[3], 
        "created_at": task[4],
        "updated_at": task[5]
    } for task in tasks])

@app.route('/tasks', methods=['POST'])
def create_task():
    """
    Create a new task.
    
    Sample JSON request:
    {
        "task_name": "Sample Task",
        "task_description": "This is a sample task description.",
        "status": 1
    }
    """
    data = request.get_json()
    task_name = data.get('task_name')
    task_description = data.get('task_description', '')
    status = data.get('status', 1)
    
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO task (task_name, task_description, status) VALUES (%s, %s, %s)",
        (task_name, task_description, status)
    )
    conn.commit()
    conn.close()
    
    return jsonify({"message": "Task created successfully"}), 201

@app.route('/tasks/<int:id>', methods=['PUT'])
def update_task(id):
    """
    Update an existing task.
    
    Sample JSON request:
    {
        "task_name": "Updated Task Name",
        "task_description": "Updated task description.",
        "status": 0
    }
    """
    data = request.get_json()
    task_name = data.get('task_name')
    task_description = data.get('task_description')
    status = data.get('status')
    
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        "UPDATE task SET task_name = %s, task_description = %s, status = %s WHERE id = %s",
        (task_name, task_description, status, id)
    )
    conn.commit()
    conn.close()
    
    return jsonify({"message": "Task updated successfully"})

@app.route('/tasks/<int:id>', methods=['DELETE'])
def delete_task(id):
    """
    Delete a task.
    """
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("UPDATE task SET status = 0 WHERE id = %s", (id,))
    conn.commit()
    conn.close()
    
    return jsonify({"message": "Task deleted successfully"})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)