import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Joyride from 'react-joyride';

const Addtask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("To-Do");
  const [runTour, setRunTour] = useState(true); // Start guide automatically
  const navigate = useNavigate();

  const addTask = async () => {
    if (!title || !description) {
      Swal.fire("Oops!", "Please fill in all fields!", "warning");
      return;
    }

    try {
      const newTask = { title, description, category };
      await axios.post("https://job-task-server-dusky.vercel.app/tasks", newTask);
      
      Swal.fire({
        title: "Success!",
        text: "Task added successfully",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/mytask");
      });

    } catch (error) {
      Swal.fire("Error!", "Something went wrong", "error");
    }
  };

  // Steps for Joyride
  const steps = [
    {
      target: "#task-title", // Target Task Title input
      content: "Enter a task title here.",
      placement: "bottom",
    },
    {
      target: "#task-description", // Target Task Description input
      content: "Describe your task in this field.",
      placement: "bottom",
    },
    {
      target: "#add-task-btn", // Target Add Task button
      content: "Click 'Add Task' to save your task.",
      placement: "top",
    },
  ];

  return (
    <div className="h-screen w-full flex justify-center items-center bg-gradient-to-br from-[#8dc8ff] to-blue-600 p-5">
      <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-5">Task Manager</h1>

        {/* Joyride Guide */}
        <Joyride steps={steps} run={runTour} continuous showProgress showSkipButton />

        <div className="flex flex-col gap-4">
          <input
            id="task-title" // ID for Joyride
            type="text"
            placeholder="Task Title"
            value={title}
            maxLength={50}
            onChange={(e) => setTitle(e.target.value)}
            className="p-3 border bg-blue-200 text-black rounded-3xl w-full"
          />
          <textarea
            id="task-description" // ID for Joyride
            placeholder="Task Description"
            value={description}
            maxLength={200}
            onChange={(e) => setDescription(e.target.value)}
            className="p-3 border bg-blue-200 text-black rounded-3xl w-full"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-3 border bg-blue-200 text-black rounded-3xl w-full"
          >
            <option value="To-Do">To-Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
          <button
            id="add-task-btn" // ID for Joyride
            onClick={addTask}
            className="bg-blue-600 rounded-3xl text-white py-3 w-full hover:bg-blue-700 transition"
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default Addtask;
