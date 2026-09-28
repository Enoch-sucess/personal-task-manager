import { useState } from "react";
import type { NewTaskData, EditTask, Task } from "../types";

interface TaskFormProps {
  mode: "create" | "edit";
  initialTask?: Task;
  onSubmit: (data: NewTaskData | EditTask) => Promise<void>;
}

const TaskForm = ({ mode, initialTask, onSubmit }: TaskFormProps) => {
  const [title, setTitle] = useState(initialTask?.title ?? "");
  const [description, setDescription] = useState(
    initialTask?.description ?? "",
  );
  const [category, setCategory] = useState<"Work" | "Personal" | "Urgent" | "">(
    initialTask?.category ?? "",
  );
  const [dueDate, setDueDate] = useState(initialTask?.dueDate ?? "");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!title.trim()) newErrors.title = "Title is required";
    if (!description.trim()) newErrors.description = "Description is required";
    if (!category) newErrors.category = "Category is required";

    const today = new Date().toISOString().split("T")[0];
    if (!dueDate) {
      newErrors.dueDate = "Due date is required";
    } else if (dueDate < today) {
      newErrors.dueDate = "Due date cannot be in the past";
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    await onSubmit({
      title: title.trim(),
      description: description.trim(),
      category,
      dueDate,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-5xl mx-auto">
      <div className="mb-5">
        <label className="block text-gray-500 mb-1" htmlFor="title">
          Title
        </label>
        <input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="E.g Project Defense, Assignment..."
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-[#974FD0]"
        />
        {errors.title && (
          <p className="text-xs text-red-500 mt-1">{errors.title}</p>
        )}
      </div>

      <div className="mb-5">
        <label
          className="block text-sm text-gray-500 mb-1"
          htmlFor="description"
        >
          Description
        </label>
        <textarea
          id="description"
          value={description}
          rows={5}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Briefly describe your task..."
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2-[#974FD0]"
        />
        {errors.description && (
          <p className="text-xs text-red-500 mt-1">{errors.description}</p>
        )}
      </div>

      <div className="mb-5">
        <label className="block text-sm text-gray-500 mb-1" htmlFor="dueDate">
          Due Date
        </label>
        <input
          id="dueDate"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-3 text-sm focus:outline-none focus-ring-2 focus:ring-[#974FD0]"
        />
        {errors.dueDate && (
          <p className="text-xs text-red-500 mt-1">{errors.dueDate}</p>
        )}
      </div>

      <div className="mb-6">
        <label className="block test-sm text-gray-500 mb-1" htmlFor="category">
          Category
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value as typeof category)}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus-ring-[#974FD0]"
        >
          <option value="">Select category</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Urgent">Urgent</option>
        </select>
        {errors.category && (
          <p className="text-xs text-red-500 mt-1">{errors.category}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-[#974FD0] text-white py-3 rounded-lg font-semibold mb-5"
      >
        {mode === "create" ? "Done" : "Save Changes"}
      </button>
    </form>
  );
};

export default TaskForm;
