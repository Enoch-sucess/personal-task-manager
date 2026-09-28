import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useTask } from "../context/TaskContext";
import TaskCard from "../components/TaskCard";

const MyTasks = () => {
  const { tasks, updateTask, deleteTask } = useTask();
  const navigate = useNavigate();

  const [categoryFilter, setCategoryFilter] = useState<
    "All" | "Work" | "Personal" | "Urgent"
  >("All");
  const [statusFilter, setStatusFilter] = useState<
    "All" | "Completed" | "Incomplete"
  >("All");

  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const categoryMatch =
        categoryFilter === "All" || task.category === categoryFilter;
      const statusMatch =
        statusFilter === "All" ||
        (statusFilter === "Completed" && task.completed) ||
        (statusFilter === "Incomplete" && !task.completed);
      return categoryMatch && statusMatch;
    });
  }, [tasks, categoryFilter, statusFilter]);

  const taskPendingDelete = tasks.find((t) => t._id === pendingDeleteId);

  const handleConfirmDelete = () => {
    if (pendingDeleteId) {
      deleteTask(pendingDeleteId);
      setPendingDeleteId(null);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          My Tasks
        </h1>
        <button
          onClick={() => navigate("/new")}
          className="bg-[#974FD0] text-white px-4 py-2 rounded-lg text-sm font-semibold"
        >
          + Add New Task
        </button>
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        <select
          value={categoryFilter}
          onChange={(e) =>
            setCategoryFilter(e.target.value as typeof categoryFilter)
          }
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white"
        >
          <option value="All">All categories</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Urgent">Urgent</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value as typeof statusFilter)
          }
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white"
        >
          <option value="All">All statuses</option>
          <option value="Completed">Completed</option>
          <option value="Incomplete">Incomplete</option>
        </select>
      </div>

      {filteredTasks.length === 0 ? (
        <p className="text-gray-400 text-center py-12">
          No tasks match these filters.
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onToggleComplete={(id) =>
                updateTask(id, { completed: !task.completed })
              }
              onDelete={(id) => setPendingDeleteId(id)}
              onEdit={(id) => navigate(`/edit/${id}`)}
            />
          ))}
        </div>
      )}

      {taskPendingDelete && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center px-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full">
            <h2 className="font-semibold text-gray-900 text-lg">
              Are you sure?
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              "{taskPendingDelete.title}" will be permanently deleted. This
              can't be undone.
            </p>
            <div className="flex gap-3 mt-5">
              <button
                onClick={() => setPendingDeleteId(null)}
                className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="flex-1 bg-rose-600 text-white py-2 rounded-lg text-sm font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyTasks;
