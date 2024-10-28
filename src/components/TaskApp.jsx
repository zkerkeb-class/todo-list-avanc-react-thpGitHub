"use client";
import React, { useState, useMemo } from "react";
// import { useTasks } from '../hooks/useTasks';
import { useTasksContext } from "../context/TasksContext";

function TaskApp() {
  const [filter, setFilter] = useState("all");
  const { tasks, addTask, deleteTask, toggleTaskCompletion } =
    useTasksContext();
  const [newTask, setNewTask] = useState("");

  const filteredTasks = useMemo(() => {
    if (filter === "completed") {
      return tasks.filter((task) => task.completed);
    }
    if (filter === "incomplete") {
      return tasks.filter((task) => !task.completed);
    }
    return tasks;
  }, [tasks, filter]);

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      addTask(newTask);
      setNewTask("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-xl w-full max-w-2xl p-8">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          Gestionnaire de tâches
        </h1>

        {/* Input pour ajouter une nouvelle tâche */}
        <div className="flex mb-6">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Ajouter une nouvelle tâche"
            className="flex-1 px-5 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <button
            onClick={handleAddTask}
            className="bg-pink-500 text-white px-5 py-3 rounded-r-lg hover:bg-pink-600 transition"
          >
            Ajouter
          </button>
        </div>

        {/* Filtres */}
        <div className="flex justify-around mb-6">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-full font-medium transition ${
              filter === "all"
                ? "bg-pink-500 text-white"
                : "bg-gray-200 text-gray-800"
            } hover:bg-pink-400`}
          >
            Toutes
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`px-4 py-2 rounded-full font-medium transition ${
              filter === "completed"
                ? "bg-pink-500 text-white"
                : "bg-gray-200 text-gray-800"
            } hover:bg-pink-400`}
          >
            Terminées
          </button>
          <button
            onClick={() => setFilter("incomplete")}
            className={`px-4 py-2 rounded-full font-medium transition ${
              filter === "incomplete"
                ? "bg-pink-500 text-white"
                : "bg-gray-200 text-gray-800"
            } hover:bg-pink-400`}
          >
            Non terminées
          </button>
        </div>

        {/* Liste des tâches */}
        <ul className="space-y-4">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task, index) => (
              <li
                key={index}
                className={`flex justify-between items-center p-4 border rounded-lg transition ${
                  task.completed
                    ? "bg-green-100 border-green-300"
                    : "bg-gray-100 border-gray-300"
                }`}
              >
                <span
                  className={`text-lg font-medium ${task.completed ? "line-through text-gray-500" : "text-gray-800"}`}
                >
                  {task.text}
                </span>
                <div className="flex space-x-3">
                  <button
                    onClick={() => toggleTaskCompletion(index)}
                    className={`px-4 py-2 rounded-lg text-white text-sm font-medium transition ${
                      task.completed
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-green-500 hover:bg-green-600"
                    }`}
                  >
                    {task.completed ? "Annuler" : "Terminer"}
                  </button>
                  <button
                    onClick={() => deleteTask(index)}
                    className="px-4 py-2 rounded-lg bg-gray-500 text-white text-sm font-medium hover:bg-gray-600 transition"
                  >
                    Supprimer
                  </button>
                </div>
              </li>
            ))
          ) : (
            <li className="text-center text-gray-700">Aucune tâche trouvée</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default TaskApp;
