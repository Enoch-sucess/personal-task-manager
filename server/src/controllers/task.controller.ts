import { Response } from "express";
import Task from "../models/Task";
import { AuthRequest } from "../types/authRequest";

export const createTask = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Not Authorized" });
      return;
    }

    const { title, description, dueDate, category } = req.body;
    if (!title) {
      res.status(400).json({ message: "Task title is required" });
      return;
    }
    if (!description) {
      res.status(400).json({ message: "Task description is required" });
      return;
    }
    if (!dueDate) {
      res.status(400).json({ message: "Task due date is required" });
      return;
    }
    if (!category) {
      res.status(400).json({ message: "Task category is required" });
      return;
    }

    const task = await Task.create({
      user: req.user._id,
      title,
      description,
      dueDate,
      category,
    });

    res.status(201).json(task);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Server Error";
    res.status(500).json({ message });
  }
};

export const getTasks = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Not Authorized" });
      return;
    }

    const tasks = await Task.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.status(200).json({ tasks });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Server Error";
    res.status(500).json({ message });
  }
};

//Getting a single task
export const getTaskById = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Not Authorized" });
      return;
    }

    const task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    // Ownership check
    if (task.user.toString() !== req.user._id.toString()) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    res.status(200).json(task);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Server Error";
    res.status(500).json({ message });
  }
};

// Updating a task
export const updateTask = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Not Authorized" });
      return;
    }

    const task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    // Ownership check
    if (task.user.toString() !== req.user._id.toString()) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    const { title, description, dueDate, category, completed } = req.body;

    task.title = title ?? task.title;
    task.description = description ?? task.description;
    task.dueDate = dueDate ?? task.dueDate;
    task.category = category ?? task.category;
    task.completed = completed ?? task.completed;

    await task.save();
    res.status(200).json(task);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Server Error";
    res.status(500).json({ message });
  }
};

export const deleteTask = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Not Authorized" });
      return;
    }

    const task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    // ownership check
    if (task.user.toString() !== req.user._id.toString()) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    await task.deleteOne();
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Server Error";
    res.status(500).json({ message });
  }
};
