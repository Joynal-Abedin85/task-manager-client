import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import Swal from 'sweetalert2';
import { FaEdit, FaTrash } from 'react-icons/fa';


const Mytask = () => {
    
    const [tasks, setTasks] = useState({
        "To-Do": [],
        "In Progress": [],
        "Done": [],
      });

      const [editTask, setEditTask] = useState(null);
      const [editedTitle, setEditedTitle] = useState("");
      const [editedDescription, setEditedDescription] = useState("");
    
    
    
      useEffect(() => {
        fetchTasks();
      }, []);
    
      const fetchTasks = async () => {
        const response = await axios.get("http://localhost:5000/tasks");
        const categorizedTasks = {
          "To-Do": response.data.filter((task) => task.category === "To-Do"),
          "In Progress": response.data.filter((task) => task.category === "In Progress"),
          "Done": response.data.filter((task) => task.category === "Done"),
        };
        setTasks(categorizedTasks);
      };
    
      const handleDragEnd = async (result) => {
        if (!result.destination) return;
    
        const { source, destination } = result;
        const taskMoved = tasks[source.droppableId][source.index];
    
        if (source.droppableId !== destination.droppableId) {
          // Update backend
          await axios.put(`http://localhost:5000/tasks/${taskMoved._id}`, { category: destination.droppableId });
    
          // Update frontend state
          const updatedSourceTasks = [...tasks[source.droppableId]];
          updatedSourceTasks.splice(source.index, 1);
    
          const updatedDestTasks = [...tasks[destination.droppableId]];
          updatedDestTasks.splice(destination.index, 0, { ...taskMoved, category: destination.droppableId });
    
          setTasks({
            ...tasks,
            [source.droppableId]: updatedSourceTasks,
            [destination.droppableId]: updatedDestTasks,
          });
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
          await axios.delete(`http://localhost:5000/tasks/${taskId}`);
          Swal.fire("Deleted!", "Your task has been deleted.", "success");
          fetchTasks();
        }
      };
    
      const handleEdit = (task) => {
        setEditTask(task);
        setEditedTitle(task.title);
        setEditedDescription(task.description);
      };
    
      const saveEdit = async () => {
        await axios.put(`http://localhost:5000/tasks/${editTask._id}`, {
          title: editedTitle,
          description: editedDescription,
        });
    
        setEditTask(null);
        Swal.fire("Updated!", "Your task has been updated.", "success");
        fetchTasks();
      };
    
    
    return (
        <div className="  bg-gradient-to-br from-green-400 to-blue-500 flex justify-center items-center p-10">
        <div className="w-full overflow-y-auto my-10 h-screen  max-w-5xl bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl  font-bold text-center text-gray-800 mb-5">Task Manager</h1>
  
          <DragDropContext onDragEnd={handleDragEnd}>
            <div className="grid  overflow-y-auto grid-cols-3 gap-4">
              {Object.keys(tasks).map((category) => (
                <Droppable key={category} droppableId={category}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="bg-gray-200  p-4 rounded-lg min-h-[400px]"
                    >
                      <h2 className="text-xl  font-semibold mb-3 text-purple-700">{category}</h2>
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
                                className="px-2 py-1 text-xs bg-blue-500 text-white rounded"
                              >
                                <FaEdit size={18} />
                              </button>
                              <button
                                onClick={() => handleDelete(task?._id)}
                                className="px-2 py-1 text-xs bg-red-500 text-white rounded"
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
              className="w-full p-2 border rounded mb-2"
            />
            <textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              className="w-full p-2 border rounded mb-2"
            ></textarea>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditTask(null)}
                className="px-3 py-1 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>
              <button onClick={saveEdit} className="px-3 py-1 bg-green-500 text-white rounded">
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