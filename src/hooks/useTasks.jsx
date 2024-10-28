"use client";
import { useState, useEffect, useCallback } from "react";

// Custom Hook to manage tasks
export function useTasks() {
  const [tasks, setTasks] = useState([]);

  // Load tasks from local storage on initial load
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  // Save tasks to local storage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add a new task
  const addTask = useCallback(
    (task) => {
      setTasks([...tasks, { text: task, completed: false }]);
    },
    [tasks],
  );

  // Delete a task
  const deleteTask = useCallback((index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  }, []);

  // Toggle task completion
  const toggleTaskCompletion = useCallback((index) => {
    const newTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task,
    );
    setTasks(newTasks);
  }, []);

  return {
    tasks,
    addTask,
    deleteTask,
    toggleTaskCompletion,
  };
}
