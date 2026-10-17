import { useEffect, useState, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import { type AuthUser, type LoginForm, type RegisterForm } from "../types";
import api from "../api/axios";

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser) as AuthUser);
      } catch {
        setUser(null);
      }
    }

    setLoading(false);
  }, []);

  const register = async (formData: RegisterForm): Promise<void> => {
    const { data } = await api.post<AuthUser>("/api/auth/register", formData);

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data));
    setUser(data);
  };

  const login = async (formData: LoginForm): Promise<void> => {
    const { data } = await api.post<AuthUser>("/api/auth/login", formData);

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data));
    setUser(data);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  console.log("2. AuthProvider rendering");

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
