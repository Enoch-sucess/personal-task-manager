import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useTask } from "../context/TaskContext";
import TaskForm from "../components/TaskForm";
import { getErrorMessage } from "../utils/getErrorMessage";
import type { NewTaskData } from "../types";

const NewTask = () => {
  const { createTask } = useTask();
  const navigate = useNavigate();

  const handleSubmit = async (data: NewTaskData) => {
    try {
      await createTask(data);
      toast.success("Task created");
      navigate("/mytask");
    } catch (err) {
      toast.error(getErrorMessage(err, "Could not create task"));
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Link to="/mytask" className="text-sm text-gray-500 hover:text-[#974FD0]">
        &larr; Back
      </Link>
      <h1 className="text-2xl font-bold text-gray-900 mt-2 mb-6">New Task</h1>
      <TaskForm mode="create" onSubmit={handleSubmit} />
    </div>
  );
};

export default NewTask;
