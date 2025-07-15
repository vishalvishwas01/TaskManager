import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ForgotPassword from "../Common/ForgotPassword";
import background from "../../assets/background.png";
import signbanner from "../../assets/signbanner.png";

function Login() {
  const [searchList, setSearchList] = useState([]);
  const [loginData, setLoginData] = useState({ identifier: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

   const [userInfo, setUserInfo] = useState({
      name: '',
      username: '',
      email: ''
    });
  
    const [errors, setErrors] = useState({
    username: '',
    email: ''
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await fetch(`http://localhost:3000/get`);
    const data = await res.json();
    setSearchList(data);
  };

  const handleInputChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    const user = searchList.find(
      (user) =>
        (user.username === loginData.identifier ||
          user.email === loginData.identifier) &&
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

  const [fog, setFog]=useState('hidden')
  
  const handlefogtoggle = ()=>{
    setFog('flex')
  }
  

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
            <div className="w-full">
              <input
                onChange={handleInputChange}
                value={loginData.identifier}
                type="text"
                name="identifier"
                className="border-2 border-gray-400 w-[100%] sm:w-[90%] py-2 rounded-xl px-2"
                placeholder="Enter your username or email"
              />
            </div>
            <div className="w-full">
              <input
                onChange={handleInputChange}
                value={loginData.password}
                type="password"
                name="password"
                className="border-2 border-gray-400 w-[100%] sm:w-[90%] py-2 rounded-xl px-2"
                placeholder="Enter your password"
              />
            </div>
            <button
              onClick={handleLogin}
              className="bg-[#FF6767] hover:bg-red-600 cursor-pointer text-white p-3 rounded-2xl"
            >
              Log In
            </button>
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
                Forgot Password ?
              </span>
            </button>


            <div className="flex justify-center items-center gap-2">
              Or, Login with <button>facebook</button>
              <button>google</button>
              <button>github</button>
              <button>twitter</button>
            </div>
          </div>
        </div>
            <ForgotPassword fogtoggle={fog} setFogtoggle={setFog}  emailunchange={userInfo.email}  />
      </div>
    </div>
  );
}

export default Login;
