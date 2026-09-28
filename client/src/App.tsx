import { Routes, Route } from "react-router-dom";
import TaskProvider from "./context/TaskProvider";
import Navbar from "./components/Navbar";
import MyTasks from "./pages/MyTasks";
import NewTask from "./pages/NewTask";
import EditTask from "./pages/EditTask";
import Landing from "./pages/Landing";

function App() {
  return (
    <TaskProvider>
      <Navbar />
      <Routes>
        <Route path="/welcome" element={<Landing />} />
        <Route path="/" element={<MyTasks />} />
        <Route path="/new" element={<NewTask />} />
        <Route path="/edit/:id" element={<EditTask />} />
      </Routes>
    </TaskProvider>
  );
}

export default App;
