import { Document, Model } from "mongoose";
import mongoose from "mongoose";

export interface ITask extends Document {
  _id: mongoose.Types.ObjectId;
  title: string;
  description?: string;
  dueDate: string;
  category: "Work" | "Personal" | "Urgent";
  completed: boolean;
  user: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema = new mongoose.Schema<ITask>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    dueDate: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      enum: ["Work", "Personal", "Urgent"],
      required: true,
    },

    completed: {
      type: Boolean,
      default: false,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // This links a task to a user
      required: true,
    },
  },
  { timestamps: true },
);

const Task: Model<ITask> = mongoose.model<ITask>("Task", taskSchema);

export default Task;
