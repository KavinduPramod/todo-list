
# Backend (Flask) Overview

This directory contains the Flask backend application for the to-do list project. Below is an overview of each file and how they work together.

## Files and Purpose

1. **`config.py`**  
   - Contains configurations for the backend app, including database credentials and environment variables like `DB_HOST`, `DB_USER`, `DB_PASSWORD`, and `DB_NAME`.  
   - These values can be set via environment variables for different environments.

2. **`requirements.txt`**  
   - Lists the Python dependencies needed by this backend, including:
     - `Flask`: The main web framework used to build the API.
     - `flask-mysqldb`: Provides MySQL database support for Flask.
     - `flask-cors`: Handles Cross-Origin Resource Sharing for requests from other domains/ports.

3. **Application Files** (e.g., `app.py` or other modules):  
   - The main Flask application file, such as `app.py`, defines all endpoints (routes) for the to-do API (e.g., creating, reading, updating, deleting tasks).

4. **Directory Structure**  
   - Subdirectories like `routes/` or `models/` may exist to organize route definitions and database interactions or ORM models.

5. **Database Integrations**  
   - The server connects to a MariaDB instance, with credentials and database info pulled from environment variables defined in `config.py`.

## Running the Backend

1. **Local Environment**  
   - Ensure you have Python (3.x) installed.
   - Create a virtual environment and activate it:
     ```bash
     python -m venv venv
     source venv/bin/activate  # On Windows use `venv\Scripts\activate`
     ```
   - From the `backend` directory, install dependencies:
     ```bash
     pip install -r requirements.txt
     ```
   - Run the Flask app:
     ```bash
     python app.py
     ```
     or
     ```bash
     flask run --host=0.0.0.0 --port=5000
     ```

2. **Docker & Docker Compose**  
   - If using Docker Compose, run:
     ```bash
     docker-compose up --build
     ```
   - This command starts both the backend and the database as configured in the `docker-compose.yml` file.

## Environment Variables

- **`DB_HOST`**: Hostname of the database (default: `database`).  
- **`DB_USER`**: Database username (default: `user`).  
- **`DB_PASSWORD`**: Database user password (default: `123`).  
- **`DB_NAME`**: Database name for this project (default: `todo_db`).  

These variables can be adjusted as needed for development, testing, or production deployments.

## API Endpoints

Here are the main endpoints provided by the backend API:

- **GET /tasks**: Retrieve a list of all tasks.
- **POST /tasks**: Create a new task. Requires a JSON body with task details.
- **GET /tasks/<id>**: Retrieve a specific task by its ID.
- **PUT /tasks/<id>**: Update a specific task by its ID. Requires a JSON body with updated task details.
- **DELETE /tasks/<id>**: Delete a specific task by its ID.

Each endpoint interacts with the database to perform CRUD operations on the tasks.