import { useNavigate, useParams, Link } from "react-router-dom";
import { useTask } from "../context/TaskContext";
import TaskForm from "../components/TaskForm";
import edittaskbtn from "../assets/Edit task.svg";

const EditTask = () => {
  const { id } = useParams<{ id: string }>();
  const { tasks, updateTask } = useTask();
  const navigate = useNavigate();

  const task = tasks.find((t) => t._id === id);

  if (!task) {
    return (
      <div>
        <p>Task not found</p>
        <Link to="/">Back to My Tasks</Link>
      </div>
    );
  }

  const handleSubmit = async (data: Parameters<typeof updateTask>[1]) => {
    await updateTask(task._id, data);
    navigate("/");
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Link to="/">
        <img
          className="w-full max-w-[150px] h-auto mb-8"
          src={edittaskbtn}
          alt=""
        />
      </Link>
      <TaskForm mode="edit" initialTask={task} onSubmit={handleSubmit} />
    </div>
  );
};

export default EditTask;
