import { useState, useEffect, useContext, type ReactNode } from "react";
import axios from "axios";
import api from "../api/axios";
import { AuthContext } from "./AuthContext";
import { TaskContext } from "./TaskContext";
import type { Task, NewTaskData, EditTask } from "../types";

interface TaskProviderProps {
  children: ReactNode;
}

const TaskProvider = ({ children }: TaskProviderProps) => {
  const { user } = useContext(AuthContext);
  const userId = user?._id;

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Load this user's tasks whenever the logged-in user changes
  useEffect(() => {
    if (!userId) {
      setTasks([]);
      return;
    }

    const loadTasks = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await api.get<{ tasks: Task[] }>("/api/task");
        setTasks(data.tasks);
      } catch (err) {
        setError(
          axios.isAxiosError(err)
            ? (err.response?.data?.message ?? "Could not load tasks")
            : "Could not load tasks",
        );
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, [userId]);

  // The three writes don't catch errors on purpose: the calling page
  // decides what to show, and must not navigate away if saving failed.
  const createTask = async (taskData: NewTaskData): Promise<void> => {
    const { data } = await api.post<Task>("/api/task", taskData);
    setTasks((prev) => [data, ...prev]);
  };

  const updateTask = async (id: string, updates: EditTask): Promise<void> => {
    const { data } = await api.put<Task>(`/api/task/${id}`, updates);
    setTasks((prev) => prev.map((task) => (task._id === id ? data : task)));
  };

  const deleteTask = async (id: string): Promise<void> => {
    await api.delete(`/api/task/${id}`);
    setTasks((prev) => prev.filter((task) => task._id !== id));
  };

  const value = {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export default TaskProvider;
