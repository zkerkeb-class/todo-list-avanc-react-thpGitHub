import React, { createContext, useContext } from "react";
import { useTasks } from "../hooks/useTasks";

const TasksContext = createContext();

export const TasksProvider = ({ children }) => {
  const { tasks, addTask, deleteTask, toggleTaskCompletion } = useTasks();

  return (
    <TasksContext.Provider
      value={{ tasks, addTask, deleteTask, toggleTaskCompletion }}
    >
      {children}
    </TasksContext.Provider>
  );
};

// Hook personnalisé pour accéder au contexte
export const useTasksContext = () => {
  return useContext(TasksContext);
};
