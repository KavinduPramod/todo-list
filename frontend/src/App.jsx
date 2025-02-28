import { useState, useEffect } from "react";
import Swal from 'sweetalert2';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", desc: "" });
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;

  // Fetch tasks whenever refreshTrigger changes
  useEffect(() => {
    fetchTasks();
  }, [refreshTrigger]);

  // Helper function to fetch tasks
  const fetchTasks = () => {
    fetch("http://localhost:5000/tasks")
      .then((res) => res.json())
      .then((data) => {
        // Sort tasks by created_at date in descending order
        const sortedTasks = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setTasks(sortedTasks);
        // Reset to first page when getting new data
        setCurrentPage(1);
      })
      .catch((err) => console.error("Error fetching tasks:", err));
  };

  // Add a new task
  const addTask = () => {
    if (newTask.title.trim() && newTask.desc.trim()) {
      const taskData = {
        task_name: newTask.title,
        task_description: newTask.desc,
        status: 1
      };

      fetch("http://localhost:5000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(taskData)
      })
        .then((res) => res.json())
        .then(() => {
          // Trigger a refresh to get the latest tasks including the new one
          setRefreshTrigger(prev => prev + 1);
          setNewTask({ title: "", desc: "" });
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Task added successfully!',
          })
        })
        .catch((err) => console.error("Error adding task:", err));
    } else {
      console.error("Task title and description cannot be empty");
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Task title and description cannot be empty!',
      })
    }
  };

  // Mark task as done (delete in UI)
  const markDone = (id) => {
    // Check if id exists before making the request
    if (!id) {
      console.error("Cannot delete task: ID is undefined");
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Cannot delete task: ID is undefined!',
      })
      return;
    }

    fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ status: 0 })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to delete task: ${response.status}`);
        }
        return response.json().catch(() => ({})); // Handle both JSON and empty responses
      })
      .then(() => {
        // Trigger a refresh to get the updated task list
        setRefreshTrigger(prev => prev + 1);
        Swal.fire({
          icon: 'success',
          title: 'Well Done!',
          text: 'Congrats you completed the task!',
          confirmButtonAriaLabel: 'Great!',
          confirmButtonText: 'Great 👍',
        })
      })
      .catch((err) => {
        console.error("Error updating task:", err);
        // Refresh anyway in case of error to ensure UI is consistent with backend
        setRefreshTrigger(prev => prev + 1);
      });
  };

  // Pagination logic
  const totalPages = Math.ceil(tasks.length / tasksPerPage);
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg p-6 rounded-xl w-full max-w-4xl flex flex-col md:flex-row">
        {/* Left: Task Input */}
        <div className="w-full md:w-1/2 pr-0 md:pr-6 border-b md:border-b-0 md:border-r mb-6 md:mb-0">
          <h2 className="text-lg font-semibold mb-4">Add a Task</h2>
          <input
            type="text"
            placeholder="Title"
            className="w-full p-2 border rounded mb-3"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          />
          <textarea
            placeholder="Description"
            className="w-full p-2 border rounded mb-3"
            value={newTask.desc}
            onChange={(e) => setNewTask({ ...newTask, desc: e.target.value })}
          />
          <button
            onClick={addTask}
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
          >
            Add
          </button>
        </div>

        {/* Right: Task List with Pagination */}
        <div className="w-full md:w-1/2 pl-0 md:pl-6">
          {tasks.length === 0 ? (
            <p className="text-gray-500 text-center mt-4">No tasks yet. Add one to get started!</p>
          ) : (
            <>
              {/* Task list */}
              {currentTasks.map((task) => (
                <div
                  key={task.id || `temp-${Date.now()}-${Math.random()}`}
                  className={`p-4 mb-3 shadow-md rounded-lg flex justify-between items-center ${
                    task.done ? "bg-gray-200" : "bg-gray-100"
                  }`}
                >
                  <div>
                    <h3 className="font-semibold">{task.task_name}</h3>
                    <p className="text-sm text-gray-600">{task.task_description}</p>
                  </div>
                  <button
                    onClick={() => markDone(task.id)}
                    className={`px-4 py-1 text-sm rounded ${
                      task.done ? "bg-green-500 text-white" : "bg-gray-300"
                    }`}
                  >
                    {task.done ? "Done ✅" : "Done"}
                  </button>
                </div>
              ))}
              
              {/* Pagination controls - only show if there are more than 5 tasks */}
              {tasks.length > tasksPerPage && (
                <div className="flex justify-between items-center mt-4">
                  <button 
                    onClick={prevPage} 
                    disabled={currentPage === 1}
                    className={`px-3 py-1 rounded ${currentPage === 1 ? 'bg-gray-200 text-gray-500' : 'bg-blue-500 text-white'}`}
                  >
                    Previous
                  </button>
                  
                  <div className="flex space-x-1">
                    {Array.from({ length: totalPages }, (_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => paginate(i + 1)}
                        className={`w-8 h-8 rounded-full ${
                          currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                  
                  <button 
                    onClick={nextPage} 
                    disabled={currentPage === totalPages}
                    className={`px-3 py-1 rounded ${currentPage === totalPages ? 'bg-gray-200 text-gray-500' : 'bg-blue-500 text-white'}`}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}