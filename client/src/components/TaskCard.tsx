import type { Task } from "../types";
import edit from "../assets/edit-note.svg";
import bin from "../assets/delete.svg";

interface TaskCardProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

const CATEGORY_STYLES: Record<Task["category"], string> = {
  Work: "text-green-600",
  Personal: "text-blue-600",
  Urgent: "text-rose-600",
};

const TaskCard = ({
  task,
  onToggleComplete,
  onDelete,
  onEdit,
}: TaskCardProps) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <span
          className={`text-sm font-semibold ${CATEGORY_STYLES[task.category]}`}
        >
          {task.category}
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(task._id)}
            className="flex items-center gap-1 bg-[#974FD0] text-white px-3 py-1.5 rounded-md text-sm"
          >
            <img src={edit} alt="" className="w-4 h-4" />
            Edit
          </button>
          <button
            onClick={() => onDelete(task._id)}
            className="flex items-center gap-1 border border-[#974FD0] text-[#974FD0] px-3 py-1.5 rounded-md text-sm"
          >
            <img src={bin} alt="" className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>

      <h3
        className="font-semibold text-gray-900 text-lg mt-3"
        style={{ textDecoration: task.completed ? "line-through" : "none" }}
      >
        {task.title}
      </h3>
      <p className="text-gray-500 text-sm mt-2">{task.description}</p>

      <div className="flex items-center justify-between">
        <p className="text-gray-800 text-xs mt-3">Due: {task.dueDate}</p>

        <label className="flex items-center gap-2 text-sm text-gray-600 mt-3 cursor-pointer">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleComplete(task._id)}
          />
          {task.completed ? "Completed" : "Mark complete"}
        </label>
      </div>
    </div>
  );
};

export default TaskCard;
