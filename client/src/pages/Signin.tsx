import signinLogo from "../assets/login-logo.svg";
import authLogo from "../assets/Logo.svg";
import { useNavigate } from "react-router-dom";
import {
  useContext,
  useState,
  type ChangeEvent,
  type SubmitEvent,
} from "react";
import { AuthContext } from "../context/AuthContext";
import type { LoginForm } from "../types";
import { toast } from "react-toastify";

const SignIn = () => {
  const navigate = useNavigate();

  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("AuthContext missing: provider not found");
  const { login } = ctx;

  const [form, setForm] = useState<LoginForm>({
    identifier: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (
    e: SubmitEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();

    setLoading(true);

    try {
      await login(form);
      toast.success("Logged In Successfully");
      navigate("/welcome");
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Login Failed. Please check your credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center gap-8 mx-auto px-4 sm:px-8 md:px-0 my-8 md:my-0">
      <img src={signinLogo} alt="" className="hidden lg:block w-175" />
      <div className="w-full max-w-[499px] flex flex-col gap-6 md:gap-[30px] items-center">
        <img src={authLogo} alt="" className="w-32 md:w-auto" />

        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-8 md:gap-[67px]"
        >
          <div className="flex flex-col gap-4 md:gap-[30px] items-start">
            <input
              type="text"
              name="identifier"
              placeholder="Username or Email"
              value={form.identifier}
              onChange={handleChange}
              className="w-full h-[47px] ps-5 border rounded-md"
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full h-[47px] ps-5 border rounded-md"
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full h-[56px] rounded-[30px] text-white ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#974FD0]"
            }`}
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p className="text-[16px]">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-[#974FD0] cursor-pointer"
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
