import { useState, useEffect, type ReactNode } from "react";
import type { Task, NewTaskData, EditTask } from "../types";
import { TaskContext } from "./TaskContext";

const STORAGE_KEY = "tasks";

interface TaskProviderProps {
  children: ReactNode;
}

const TaskProvider = ({ children }: TaskProviderProps) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const storedTasks = localStorage.getItem(STORAGE_KEY);
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  const [ongoing, setOngoing] = useState<Task[]>([]);
  const [completed, setCompleted] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    setOngoing(tasks.filter((task) => !task.completed));
    setCompleted(tasks.filter((task) => task.completed));
  }, [tasks]);

  const createTask = async (taskData: NewTaskData) => {
    const newTask: Task = {
      ...taskData,
      _id: crypto.randomUUID(),
      user: "",
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const updateTask = async (id: string, updatedTask: EditTask) => {
    const exists = tasks.some((task) => task._id === id);
    if (!exists) {
      setError("Task not found");
      return;
    }
    setTasks((prev) =>
      prev.map((task) =>
        task._id === id
          ? { ...task, ...updatedTask, updatedAt: new Date().toISOString() }
          : task,
      ),
    );
  };

  const deleteTask = async (id: string) => {
    setTasks((prev) => prev.filter((task) => task._id !== id));
  };

  const value = {
    tasks,
    ongoing,
    completed,
    error,
    createTask,
    updateTask,
    deleteTask,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export default TaskProvider;
