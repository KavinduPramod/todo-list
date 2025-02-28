# Frontend (React + Vite) Overview

This directory contains the frontend application for the to-do list project, built using React and Vite. Below is an overview of each file and how they work together.

## Files and Purpose

1. **`src/` Directory**  
   - Contains all the source code for the React application, including components, hooks, and utilities.
   - **`components/`**: Houses reusable React components.
   - **`hooks/`**: Contains custom React hooks for managing state and side effects.
   - **`App.jsx`**: The main entry point for the React application, where components are assembled.

2. **`public/` Directory**  
   - Contains static assets like images and the `index.html` file, which serves as the entry point for the application.

3. **`package.json`**  
   - Lists the project dependencies and scripts. Key dependencies include:
     - `react` and `react-dom`: Core libraries for building the user interface.
     - `sweetalert2`: Used for displaying alerts and notifications.
   - Dev dependencies include:
     - `@vitejs/plugin-react`: Integrates React with Vite for fast development.
     - `tailwindcss`: A utility-first CSS framework for styling.

4. **`vite.config.js`**  
   - Configuration file for Vite, specifying plugins and server settings.
   - Includes a proxy setup for API requests to the backend.

5. **`tailwind.config.js`**  
   - Configuration file for Tailwind CSS, specifying the paths to all template files and any custom theme configurations.

6. **`postcss.config.js`**  
   - Configures PostCSS plugins, including Tailwind CSS and Autoprefixer, for processing CSS files.

## Running the Frontend

1. **Local Environment**  
   - Ensure you have Node.js installed.
   - From the `frontend` directory, install dependencies:
     ```bash
     npm install
     ```
   - Start the development server:
     ```bash
     npm run dev
     ```
   - This will start a local server with hot module replacement, allowing you to see changes in real-time.

## Technologies Used

- **Vite**: A build tool that provides a faster and leaner development experience for modern web projects. It offers fast server start, instant hot module replacement, and optimized builds.
- **Tailwind CSS**: A utility-first CSS framework that allows for rapid UI development with predefined classes.
- **Nginx**: Used as a reverse proxy server to handle requests and serve the frontend application efficiently in production environments. It helps manage traffic, improve performance, and enhance security.