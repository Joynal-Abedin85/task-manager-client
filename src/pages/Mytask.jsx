import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import Swal from 'sweetalert2';
import { FaEdit, FaTrash } from 'react-icons/fa';

import Shepherd from 'shepherd.js';
import 'shepherd.js/dist/css/shepherd.css';


const Mytask = () => {
    
    const [tasks, setTasks] = useState({
        "To-Do": [],
        "In Progress": [],
        "Done": [],
      });

      const [editTask, setEditTask] = useState(null);
      const [editedTitle, setEditedTitle] = useState("");
      const [editedDescription, setEditedDescription] = useState("");
    
      const [selectedCategory, setSelectedCategory] = useState("all");
    
      useEffect(() => {
        fetchTasks();
      }, []);
    



    const fetchTasks = async () => {
        const response = await axios.get("https://job-task-server-dusky.vercel.app/tasks");
        const categorizedTasks = {
          "To-Do": response.data.filter((task) => task.category === "To-Do").sort((a, b) => a.order - b.order),
          "In Progress": response.data.filter((task) => task.category === "In Progress").sort((a, b) => a.order - b.order),
          "Done": response.data.filter((task) => task.category === "Done").sort((a, b) => a.order - b.order),
        };
        setTasks(categorizedTasks);
      };
      

    const handleDragEnd = async (result) => {
        if (!result.destination) return;
      
        const { source, destination } = result;
        const sourceCategory = source.droppableId;
        const destinationCategory = destination.droppableId;
      
        // Get the task that was moved
        const taskMoved = tasks[sourceCategory][source.index];
      
        // If moved within the same category (reordering)
        if (sourceCategory === destinationCategory) {
          const updatedTasks = [...tasks[sourceCategory]];
          updatedTasks.splice(source.index, 1);
          updatedTasks.splice(destination.index, 0, taskMoved);
      
          setTasks({ ...tasks, [sourceCategory]: updatedTasks });
      
          // Update order in the backend (optional)
          await axios.put(`https://job-task-server-dusky.vercel.app/tasks/reorder`, {
            category: sourceCategory,
            tasks: updatedTasks.map((task, index) => ({ ...task, order: index })),
          });
        } else {
          // Moving between categories
          const updatedSourceTasks = [...tasks[sourceCategory]];
          updatedSourceTasks.splice(source.index, 1);
      
          const updatedDestTasks = [...tasks[destinationCategory]];
          updatedDestTasks.splice(destination.index, 0, { ...taskMoved, category: destinationCategory });
      
          setTasks({
            ...tasks,
            [sourceCategory]: updatedSourceTasks,
            [destinationCategory]: updatedDestTasks,
          });
      
          // Update backend with new category
          await axios.put(`https://job-task-server-dusky.vercel.app/tasks/${taskMoved._id}`, { category: destinationCategory });
        }
      };

      
      const handleDelete = async (taskId) => {
        const confirm = await Swal.fire({
          title: "Are you sure?",
          text: "This task will be permanently deleted!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "Cancel",
        });
    
        if (confirm.isConfirmed) {
          await axios.delete(`https://job-task-server-dusky.vercel.app/tasks/${taskId}`);
          Swal.fire("Deleted!", "Your task has been deleted.", "success");
          fetchTasks();
        }
      };
    
      const handleEdit = (task) => {
        setEditTask(task);
        setEditedTitle(task.title);
        setEditedDescription(task.description);

        
  // Start the Shepherd.js tour dynamically
  const tour = new Shepherd.Tour({
    useModalOverlay: true,
    defaultStepOptions: { classes: 'shadow-md bg-purple-500 text-white', scrollTo: true }
  });

  tour.addStep({
    id: 'edit-fields',
    text: 'Modify the title and description here.',
    attachTo: { element: '.edit-fields', on: 'top' },
    buttons: [{ text: 'Next', action: tour.next }]
  });

  tour.addStep({
    id: 'save-task',
    text: 'Click save to update the task.',
    attachTo: { element: '.save-btn', on: 'right' },
    buttons: [{ text: 'Finish', action: tour.complete }]
  });

  tour.start();
      };
    
      const saveEdit = async () => {
        await axios.put(`https://job-task-server-dusky.vercel.app/tasks/${editTask._id}`, {
          title: editedTitle,
          description: editedDescription,
        });
    
        setEditTask(null);
        Swal.fire("Updated!", "Your task has been updated.", "success");
        fetchTasks();
      };


       // Shepherd Tour Setup
  useEffect(() => {
    const tour = new Shepherd.Tour({
      useModalOverlay: true,
      defaultStepOptions: { classes: 'shadow-md bg-purple-500 text-white', scrollTo: true }
    });

    tour.addStep({
      id: 'delete-task',
      text: 'Click here to delete a task.',
      attachTo: { element: '.delete-btn', on: 'right' },
      buttons: [{ text: 'Next', action: tour.next }]
    });

    tour.addStep({
      id: 'edit-task',
      text: 'Click here to edit a task.',
      attachTo: { element: '.edit-btn', on: 'right' },
      buttons: [{ text: 'Next', action: tour.next }]
    });


    tour.start();
  }, []);

    
    
    return (
        <div className="  bg-gradient-to-br from-[#8dc8ff] to-blue-600 flex justify-center items-center p-10">
       

<div className="w-full overflow-y-auto my-10 h-screen max-w-5xl bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-5">Task Manager</h1>
      
      {/* Dropdown for Mobile View */}
      <div className="md:hidden mb-4">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full p-2 border rounded-lg"
        >
          <option value="all">Show All</option>
          {Object.keys(tasks).map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.keys(tasks).map((category) => (
            (selectedCategory === "all" || selectedCategory === category || window.innerWidth >= 768) && (
              <Droppable key={category} droppableId={category}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="bg-gray-200 p-4 rounded-lg min-h-[400px] transition-all"
                  >
                    <h2 className="text-xl font-semibold mb-3 text-purple-700">{category}</h2>
                    {tasks[category].map((task, index) => (
                      <Draggable key={task._id} draggableId={task._id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="p-3 bg-white rounded shadow-lg mb-2"
                          >
                            <div>
                              <p className="font-semibold">{task.title}</p>
                              <p className="text-sm text-gray-600">{task.description}</p>
                            </div>
                            <div className="flex mt-5 justify-between gap-2">
                              <button
                                onClick={() => handleEdit(task)}
                                className="px-2 edit-btn py-1 text-xs bg-blue-500 text-white rounded"
                              >
                                <FaEdit size={18} />
                              </button>
                              <button
                                onClick={() => handleDelete(task?._id)}
                                className="px-2 delete-btn py-1 text-xs bg-red-500 text-white rounded"
                              >
                                <FaTrash size={18} />
                              </button>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            )
          ))}
        </div>
      </DragDropContext>
    </div>

        {editTask && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-3">Edit Task</h2>
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="w-full edit-fields p-2 border rounded mb-2"
            />
            <textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              className="w-full edit-fields p-2 border rounded mb-2"
            ></textarea>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditTask(null)}
                className="px-3 py-1 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>
              <button onClick={saveEdit} className="px-3 py-1 save-btn bg-green-500 text-white rounded">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    );
};

export default Mytask;