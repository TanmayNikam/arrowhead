import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../apiCalls/user";

const Login = () => {
  const [user, setUser] = useState({ username: "", password: "" });
  const handleChange = (name) => (e) => {
    setUser({ ...user, [name]: e.target.value });
  };
  const navigate = useNavigate();

  const loginUser = async () => {
    try {
      const response = await login(user);
      if (response.success) navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <div className="border border-orange-500 shadow-lg p-5 text-center w-96">
          <h1 className="text-3xl text--700">Movie Review</h1>
          <div className="mt-4 flex flex-col gap-4">
            <div className="mt-4 flex flex-col gap-2">
              <label className="text-left">Username</label>
              <input
                type="text"
                value={user.username}
                onChange={handleChange("username")}
                placeholder="Enter your username"
                className="pl-3"
              />
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <label className="text-left">Password</label>
              <input
                type="password"
                value={user.password}
                onChange={handleChange("password")}
                placeholder="Enter your password"
                className="pl-3"
              />
            </div>
          </div>
          <div className="mt-10 mb-3">
            <button
              className="text-xl font-bold text-white bg-orange-400 p-2 w-48"
              onClick={loginUser}>
              Log In
            </button>
          </div>
          <Link to="/register" className="text-gray-600 underline text-center">
            Click here to Register
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
