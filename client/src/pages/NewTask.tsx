import { useNavigate, Link } from "react-router-dom";
import { useTask } from "../context/TaskContext";
import TaskForm from "../components/TaskForm";
import newtaskbtn from "../assets/New task.svg";

const NewTask = () => {
  const { createTask } = useTask();
  const navigate = useNavigate();

  const handleSubmit = async (data: Parameters<typeof createTask>[0]) => {
    await createTask(data);
    navigate("/");
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Link to="/">
        <img
          className="w-full max-w-[150px] h-auto mb-8"
          src={newtaskbtn}
          alt=""
        />
      </Link>
      <TaskForm mode="create" onSubmit={handleSubmit} />
    </div>
  );
};

export default NewTask;
