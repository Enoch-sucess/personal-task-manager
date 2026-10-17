import signUpLogo from "../assets/signup-logo.svg";
import authLogo from "../assets/Logo.svg";
import {
  useContext,
  useState,
  type ChangeEvent,
  type SubmitEvent,
} from "react";
import { AuthContext } from "../context/AuthContext";
import type { RegisterForm } from "../types";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("AuthContext missing: provider not found");
  const { register } = ctx;

  const [form, setForm] = useState<RegisterForm>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
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
    if (form.password !== form.confirmPassword) {
      toast.error("Password do not match");
      setLoading(false);
      return;
    }

    try {
      await register(form);
      toast.success("Accounted Created Successfully");
      navigate("/welcome");
    } catch (err) {
      console.error("Register error:", err);
      toast.error("Registration Failed. Try Again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center gap-8 mx-auto px-4 sm:px-8 md:px-8 my-8 md:my-0">
      <img src={signUpLogo} alt="" className="hidden lg:block w-175" />

      <div className="w-full max-w-[499px] flex flex-col gap-6 md:gap-[30px] items-center">
        <img src={authLogo} alt="" className="w-32 md:w-auto" />

        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-8 md:gap-[67px]"
        >
          <div className="flex flex-col gap-4 md:gap-[30px] items-start">
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Username"
              className="w-full h-[47px] ps-5 border border-[#878789] rounded-md"
            />

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter Your Email Adress"
              className="w-full h-[47px] ps-5 border border-[#878789] rounded-md"
              required
            />

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter Your Password"
              className="w-full h-[47px] ps-5 border border-[#878789] rounded-md"
              required
            />

            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm password"
              className="w-full h-[47px] ps-5 border border-[#878789] rounded-md"
              required
            />
          </div>

          <div className="w-full flex flex-col gap-[17px] items-center">
            <button
              type="submit"
              disabled={loading}
              className={`w-full h-[56px] rounded-[30px] font-bold text-[16px] text-white ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#974FD0]"}`}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>

            <p className="text-[16px]">
              Already have an account ?
              <span
                onClick={() => navigate("/signin")}
                className="text-[#0585CD] cursor-pointer"
              >
                Sign In
              </span>
            </p>
          </div>
        </form>

        <p className="text-[13px] text-center">
          By signing up you agree with the <b>Terms of use</b> and{" "}
          <b>Privacy Policy</b>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
