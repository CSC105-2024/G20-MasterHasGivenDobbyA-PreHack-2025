import React, { useState, useEffect } from "react";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineHowToReg } from "react-icons/md";
import { BsPersonXFill } from "react-icons/bs";

const userSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

const correctUsername = "user12345";
const correctPassword = "password123";

const LogIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [loginStatus, setLoginStatus] = useState("");
  const [shakeTrigger, setShakeTrigger] = useState(false);

  const triggerShake = () => {
    setShakeTrigger(false);
    requestAnimationFrame(() => {
      setShakeTrigger(true);
    });
  };

  useEffect(() => {
    if (loginStatus === "success") {
      const timer = setTimeout(() => {
        navigate("/");
      }, 1300);
      return () => clearTimeout(timer);
    }

    if (loginStatus === "error" || loginStatus === "empty") {
      const timer = setTimeout(() => setLoginStatus(""), 2500);
      return () => clearTimeout(timer);
    }
  }, [loginStatus, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({ username: "", password: "" });
    const result = userSchema.safeParse(formData);

    if (!formData.username.trim() && !formData.password.trim()) {
      setLoginStatus("empty");
      triggerShake();
      return;
    }

    if (result.success) {
      if (
        formData.username === correctUsername &&
        formData.password === correctPassword
      ) {
        setLoginStatus("success");
      } else {
        setLoginStatus("error");
        triggerShake();
      }
    } else {
      const newErrors: { [key: string]: string } = {};
      result.error.errors.forEach((error) => {
        newErrors[error.path[0]] = error.message;
      });
      setErrors(newErrors);
      setLoginStatus("");
    }
  };

  return (
    <div className="w-full h-screen bg-[#262626] overflow-hidden relative flex justify-center items-center">
      
      <div className="z-10 flex flex-col items-center w-full max-w-md px-4">
        {loginStatus && (
          <div
            className={`w-full mb-4 transition-opacity duration-500 ease-in-out ${
              loginStatus === "success"
                ? "animate-fadeInScale"
                : shakeTrigger
                ? "animate-shake"
                : ""
            }`}
          >
            <div className="w-full flex items-center justify-center gap-2 text-center py-2 px-4 rounded-xl text-black bg-white font-bold shadow-md">
              <div className="w-6 h-6 md:w-8 md:h-8 text-2xl items-center justify-center flex">
                {loginStatus === "success" ? <MdOutlineHowToReg className="text-green-500" /> : <BsPersonXFill className="text-red-500 "/>}
              
              </div>
              <span className="text-sm md:text-base">
                {loginStatus === "success"
                  ? "Log In Successful"
                  : loginStatus === "error"
                  ? "Username or Password are not correct"
                  : loginStatus === "empty"
                  ? "Please fill the username and password"
                  : ""}
              </span>
            </div>
          </div>
        )}

        <div className="w-full p-6 bg-white rounded-3xl shadow-lg">
          <div className="text-start mb-6">
            <div className="text-black text-4xl font-bold">
              Log In
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-xl text-black font-normal ">
                Username
              </label>
              <input
                type="text"
                name="username"
                placeholder="Enter username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full h-14 p-4 bg-zinc-100 rounded-2xl outline-none"
              />
              {errors.username && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.username}
                </div>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-xl text-black font-normal ">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full h-14 p-4 bg-zinc-100 rounded-2xl outline-none"
              />
              {errors.password && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.password}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-[#491C70] hover:bg-gray-500 text-white text-2xl rounded-2xl"
            >
              Log In
            </button>
          </form>

          <div className="mt-4 text-center">
            <span className="text-black text-lg">Not a member? </span>
            <Link to="/register" className="text-blue-500 text-lg underline">
              Register Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
