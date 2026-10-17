import { useState, useEffect, type ReactNode } from "react";
import api from "../api/axios";
import { useAuth } from "./AuthContext";
import { TaskContext } from "./TaskContext";
import { getErrorMessage } from "../utils/getErrorMessage";
import type { Task, NewTaskData, EditTask } from "../types";

interface TaskProviderProps {
  children: ReactNode;
}

const TaskProvider = ({ children }: TaskProviderProps) => {
  const { user, loading: authLoading } = useAuth();
  const userId = user?._id;

  const [tasks, setTasks] = useState<Task[]>([]);
  const [tasksLoading, setTasksLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading) return;

    if (!userId) {
      setTasks([]);
      setTasksLoading(false);
      return;
    }

    const loadTasks = async () => {
      setTasksLoading(true);
      setError(null);
      try {
        const { data } = await api.get<{ tasks: Task[] }>("/api/task");
        setTasks(data.tasks);
      } catch (err) {
        setError(getErrorMessage(err, "Could not load tasks"));
      } finally {
        setTasksLoading(false);
      }
    };

    loadTasks();
  }, [userId, authLoading]);

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
    loading: authLoading || tasksLoading,
    error,
    createTask,
    updateTask,
    deleteTask,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export default TaskProvider;
