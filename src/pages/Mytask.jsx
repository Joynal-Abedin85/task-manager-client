import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";


const Mytask = () => {
    
    const [tasks, setTasks] = useState({
        "To-Do": [],
        "In Progress": [],
        "Done": [],
      });
    
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
    
    return (
        <div className="h-screen bg-gradient-to-br from-green-400 to-blue-500 flex justify-center items-center p-5">
        <div className="w-full max-w-5xl bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-5">Task Manager</h1>
  
          <DragDropContext onDragEnd={handleDragEnd}>
            <div className="grid grid-cols-3 gap-4">
              {Object.keys(tasks).map((category) => (
                <Droppable key={category} droppableId={category}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="bg-gray-200 p-4 rounded-lg min-h-[400px]"
                    >
                      <h2 className="text-xl font-semibold mb-3 text-gray-800">{category}</h2>
                      {tasks[category].map((task, index) => (
                        <Draggable key={task._id} draggableId={task._id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="p-3 bg-white rounded shadow mb-2"
                            >
                              <p className="font-semibold">{task.title}</p>
                              <p className="text-sm text-gray-600">{task.description}</p>
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
      </div>
    );
};

export default Mytask;