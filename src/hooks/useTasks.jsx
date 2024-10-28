"use client";
import { useState, useEffect, useCallback } from "react";

export function useTasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = useCallback(
    (task) => {
      setTasks([...tasks, { text: task, completed: false }]);
    },
    [tasks],
  );

  const deleteTask = useCallback((index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  }, []);

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
