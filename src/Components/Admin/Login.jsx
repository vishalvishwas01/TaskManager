import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ForgotPassword from "../Common/ForgotPassword";
import background from "../../assets/background.png";
import signbanner from "../../assets/signbanner.png";

function Login() {
  const [searchList, setSearchList] = useState([]);
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await fetch(`https://taskmanager-cnw2.onrender.com/get`);
    const data = await res.json();
    setSearchList(data);
  };

  const handleInputChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault(); // Prevent page refresh
    const user = searchList.find(
      (user) =>
        (user.username === loginData.username ||
          user.email === loginData.username) &&
        user.password === loginData.password
    );

    if (user) {
      setMessage("Login Successful");
      localStorage.setItem("username", user.username); // store username globally
      setTimeout(() => {
        navigate("/");
      }, 500);
    } else {
      setMessage("Invalid credentials");
    }
  };

  const [fog, setFog] = useState("hidden");
  const handlefogtoggle = () => {
    setFog("flex");
  };

  return (
    <div className="relative w-screen h-screen">
      <img
        className="relative w-full h-full object-cover"
        src={background}
        alt="Background"
      />
      <div className="absolute inset-0 bg-[#FF6767]/90 flex justify-center items-center z-10">
        <div className="bg-white w-6xl h-[700px] rounded-2xl flex justify-center items-center px-4 sm:px-8 mx-2 gap-1">
          <div className="w-[100%] h-[90%] hidden md:flex justify-center items-center">
            <img src={signbanner} alt="Sign Banner" />
          </div>

          <div className="w-[100%] h-[90%] flex flex-col justify-start items-start gap-5">
            <div className="text-2xl font-bold text-black">Log In</div>

            <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
              <input
                onChange={handleInputChange}
                value={loginData.username}
                type="text"
                name="username"
                autoComplete="username"
                className="border-2 border-gray-400 w-[100%] sm:w-[90%] py-2 rounded-xl px-2"
                placeholder="Enter your username or email"
              />

              <input
                onChange={handleInputChange}
                value={loginData.password}
                type="password"
                name="password"
                autoComplete="current-password"
                className="border-2 border-gray-400 w-[100%] sm:w-[90%] py-2 rounded-xl px-2"
                placeholder="Enter your password"
              />

              <button
                type="submit"
                className="bg-[#FF6767] hover:bg-red-600 cursor-pointer text-white p-3 rounded-2xl w-30"
              >
                Log In
              </button>
            </form>

            {message && (
              <div className="text-green-600 font-semibold">{message}</div>
            )}

            <NavLink
              to="/signup"
              className="flex justify-center items-center gap-2"
            >
              Don't have an account?
              <span className="text-blue-400 hover:text-blue-600 cursor-pointer">
                Sign Up
              </span>
            </NavLink>

            <button
              onClick={handlefogtoggle}
              className="flex justify-center items-center gap-2"
            >
              <span className="text-red-400 hover:text-red-600 cursor-pointer">
                Forgot Password?
              </span>
            </button>
          </div>
        </div>

        <ForgotPassword fogtoggle={fog} setFogtoggle={setFog} />
      </div>
    </div>
  );
}

export default Login;
