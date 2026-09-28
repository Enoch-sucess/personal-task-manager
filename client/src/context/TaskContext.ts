import { createContext, useContext } from "react";
import type { TaskContextValue } from "../types";

export const TaskContext = createContext<TaskContextValue | undefined>(
  undefined
);

export function useTask() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTask must be used within a TaskProvider");
  }
  return context;
}