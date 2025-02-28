# Welcome to ToDo List!

A comprehensive task management application built with modern technologies.

## Tech Stack

- **Frontend**: React.js (Vite)
- **Backend**: Flask
- **Database**: MariaDB

Detailed documentation is available in each component's directory.

## Getting Started

### Prerequisites

- Docker and Docker Compose

Verify your installation with:

```bash
docker -v
docker-compose -v
```

If not installed, download from the [Docker website](https://www.docker.com/).

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/KavinduPramod/todo-list.git
   cd todo-list
   ```

2. Make sure Docker Engine is running

3. Start the application:
   ```bash
   docker-compose up --build
   ```

4. Access the application:
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend: [http://localhost:5000](http://localhost:5000)

5. To stop the application:
   ```bash
   docker-compose down
   ```

## Project Structure

The project consists of three main components:

- **`frontend/`**: React.js application with Vite and TailwindCSS
- **`backend/`**: Flask API server
- **`database/`**: MariaDB configuration and initialization scripts

Key files:
- `docker-compose.yml`: Orchestrates all three containers
- `.gitignore`: Specifies intentionally untracked files
- `README.md`: Project documentation

## Features

- Responsive UI built with TailwindCSS
- Dynamic display that changes when more than 5 tasks are added
- RESTful API for task management
- Persistent data storage with MariaDB

## Environment Configuration

The application can be configured using a `.env` file in the root directory (optional):

```
DB_HOST=database
DB_USER=user
DB_PASSWORD=123
DB_NAME=todo_db
```

Default values are provided if the `.env` file is absent or incomplete.

## Health Checks

The `docker-compose.yml` includes health check configurations to ensure the database is functioning correctly before dependent services start.

---

*This project was created by KavinduPramod*
