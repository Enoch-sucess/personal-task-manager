import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";
import loginLogo from "../assets/login-logo.svg";
import Logo from "../assets/Logo.svg";

const Login = () => {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!identifier.trim() || !password.trim()) {
      setError("Identifier and password are required");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: identifier.trim(),
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        return;
      }

      localStorage.setItem("token", data.token);

      navigate("/");
    } catch {
      setError("Could not reach the server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center gap-8 mx-auto px-4 sm:px-8 md:px-0 my-8 md:my-0">
      <img
        src={loginLogo}
        className="hidden lg:block w-175 h-100 my-12"
        alt=""
      />

      <div className="w-full max-w-[499px] flex flex-col gap-6 md:gap-[30px] items-center">
        <img src={Logo} className="w-32 md:w-auto" alt="" />

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
          <div>
            <label
              htmlFor="identifier"
              className="block text-sm text-grey-500 mb-1"
            >
              Username or Email
            </label>
            <input
              id="identifier"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              autoComplete="username"
              placeholder="Enter your username email"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#974FD0]"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm text-gray-500 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              placeholder="Enter your password"
              className="w-full border border-gray-500 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#974FD0]"
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#974FD0] text-white py-3 rounded-lg font-semibold disable:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
