import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Mytask = () => {
    
        const [tasks, setTasks] = useState([]);
    useEffect(() => {
        fetchTasks();
      }, []);
    
      const fetchTasks = async () => {
        const response = await axios.get("http://localhost:5000/tasks");
        setTasks(response.data);
      };
    return (
        <div>
            <h2 className="text-2xl font-semibold text-gray-800 mt-6">Tasks</h2>
          <ul className="mt-3">
            {tasks.map((task) => (
              <li key={task._id} className="p-3 bg-gray-100 rounded mt-2 flex justify-between items-center">
                <div>
                  <p className="font-semibold">{task.title}</p>
                  <p className="text-sm text-gray-600">{task.description}</p>
                  <span className={`px-2 py-1 text-xs rounded ${task.category === "To-Do" ? "bg-yellow-500 text-white" : task.category === "In Progress" ? "bg-blue-500 text-white" : "bg-green-500 text-white"}`}>
                    {task.category}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
    );
};

export default Mytask;