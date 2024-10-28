"use client";
import TaskApp from "../components/TaskApp";
import "./globals.css";
import { TasksProvider } from "../context/TasksContext";

export default function Home() {
  return (
    <TasksProvider>
      <TaskApp />
    </TasksProvider>
  );
}
