import { Routes, Route, Navigate } from "react-router-dom";
import MyTasks from "./pages/MyTasks";
import NewTask from "./pages/NewTask";
import EditTask from "./pages/EditTask";
import Landing from "./pages/Landing";
import SignIn from "./pages/Signin";
import SignUp from "./pages/SignUp";
import ProtectedLayout from "./layout/ProtectedLayout";
import Error from "./pages/Error";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
      <Routes>
        <Route path="/welcome" element={<Navigate to="/welcome" replace />} />
        <Route path="/welcome" element={<Landing />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />

        <Route element={<ProtectedLayout />}>
          <Route path="/mytask" element={<MyTasks />} />
          <Route path="/new" element={<NewTask />} />
          <Route path="/edit/:id" element={<EditTask />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
