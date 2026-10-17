import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const ProtectedLayout = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <p>Loading...</p>;

  if (!user) {
    return <Navigate to="signin" replace />;
  }

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default ProtectedLayout;
