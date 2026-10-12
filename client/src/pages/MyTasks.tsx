import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useTask } from "../context/TaskContext";
import TaskCard from "../components/TaskCard";
import { useSearch } from "../hooks/useSearch";

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

  const [searchTerm, setSearchTerm] = useState("");
  const { results, loading, error } = useSearch(searchTerm);

  const isSearching = searchTerm.trim() !== "";

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

      <div className="relative mb-4 max-w-md">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search tasks..."
          className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#974FD0]"
        />
        {searchTerm && (
          <button
            type="button"
            onClick={() => setSearchTerm("")}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-500 text-xl "
          >
            x
          </button>
        )}
      </div>

      {!isSearching && (
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
      )}

      {isSearching ? (
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Search results
          </h2>

          {loading ? (
            <p className="text-gray-500 py-6">Searching tasks...</p>
          ) : error ? (
            <div className="py-4">
              <p className="text-red-500">{error}</p>

              {error.toLowerCase().includes("log  in") && (
                <button
                  onClick={() => navigate("/login")}
                  className="text-purple-600 underline mt-2"
                >
                  Log in
                </button>
              )}
            </div>
          ) : results.length === 0 ? (
            <p className="text-gray-400 text-center py-12">
              No tasks found for "{searchTerm.trim()}".
            </p>
          ) : (
            <div className="flex flex-col gap-4">
              {results.map((task) => (
                <article
                  key={task._id}
                  className="border border-gray-200 rounded-xl p-4 bg-white"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-semibold text-gray-900">
                      {task.title}
                    </h3>

                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        task.completed
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {task.completed ? "Completed" : "Incomplete"}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 mt-2">
                    {task.description || "No description"}
                  </p>

                  <div className="flex flex-wrap gap-3 mt-4 text-sm text-gray-500">
                    <span>Category: {task.category}</span>
                    <span>
                      Due:{" "}
                      {task.dueDate
                        ? new Date(
                            task.dueDate + "T00:00:00",
                          ).toLocaleDateString()
                        : "No due date"}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      ) : (
        <>
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
        </>
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
