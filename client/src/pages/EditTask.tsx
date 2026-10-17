import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useTask } from "../context/TaskContext";
import TaskForm from "../components/TaskForm";
import { getErrorMessage } from "../utils/getErrorMessage";
import type { NewTaskData } from "../types";

const EditTask = () => {
  const { id } = useParams<{ id: string }>();
  const { tasks, loading, updateTask } = useTask();
  const navigate = useNavigate();

  if (loading) {
    return (
      <p className="max-w-2xl mx-auto px-4 py-8 text-gray-500">Loading…</p>
    );
  }

  const task = tasks.find((t) => t._id === id);

  if (!task) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8 text-gray-500">
        <p>Task not found.</p>
        <Link to="/mytask" className="text-[#974FD0] text-sm hover:underline">
          Back to My Tasks
        </Link>
      </div>
    );
  }

  const handleSubmit = async (data: NewTaskData) => {
    try {
      await updateTask(task._id, data);
      toast.success("Task updated");
      navigate("/mytask");
    } catch (err) {
      toast.error(getErrorMessage(err, "Could not update task"));
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Link to="/mytask" className="text-sm text-gray-500 hover:text-[#974FD0]">
        &larr; Back
      </Link>
      <h1 className="text-2xl font-bold text-gray-900 mt-2 mb-6">Edit Task</h1>
      <TaskForm mode="edit" initialTask={task} onSubmit={handleSubmit} />
    </div>
  );
};

export default EditTask;
