import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { login } from "../redux/user/action";

const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8000/api/user/login`,
        formData
      );
      if (response.status === 200) {
        const {token, data} = response.data;
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("user", JSON.stringify(data));
        dispatch(login(data));
        setAutoLogout();
        navigate('/');
      }
    } catch (error) {
      alert(error?.response?.data?.message);
    }
  };

  const setAutoLogout = () => {
    setTimeout(() => {
      sessionStorage.removeItem("token");
      alert("Session expired. You have been logged out.");
      navigate("/signin"); 
    }, 30 * 60 * 1000); 
  };

  return (
    <div className="font-[sans-serif]">
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <div className="grid lg:grid-cols-2 items-center gap-6 max-w-7xl max-lg:max-w-xl w-full">
          <form className="lg:max-w-md w-full" onSubmit={handleSubmit}>
            <h3 className="text-gray-800 text-3xl font-extrabold mb-12">
              Welcome back to your account!
            </h3>
            <div className="space-y-6">
              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Email
                </label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange} 
                  type="email"
                  className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-4 focus:bg-transparent outline-blue-500 transition-all"
                  placeholder="Enter email"
                  required
                />
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Password
                </label>
                <input
                  name="password"
                  value={formData.password}
                  onChange={handleChange} 
                  type="password"
                  className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-4 focus:bg-transparent outline-blue-500 transition-all"
                  placeholder="Enter password"
                  required
                />
              </div>
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 shrink-0 border-gray-300 rounded"
                  required
                />
                <label
                  htmlFor="remember-me" 
                  className="ml-3 block text-sm text-gray-800"
                >
                  I accept the{" "}
                  <a
                    href="javascript:void(0);"
                    className="text-blue-600 font-semibold hover:underline ml-1"
                  >
                    Terms and Conditions
                  </a>
                </label>
              </div>
            </div>
            <div className="mt-12">
              <button
                type="submit"
                className="py-4 px-8 text-sm font-semibold text-white tracking-wide bg-blue-600 hover:bg-blue-700 focus:outline-none"
              >
                Signin
              </button>
            </div>
            <p className="text-sm text-gray-800 mt-6">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-blue-600 font-semibold hover:underline ml-1"
              >
                Register here
              </Link>
            </p>
          </form>

          <div className="h-full max-lg:mt-12">
            <img
              src="https://readymadeui.com/login-image.webp"
              className="w-full h-full object-cover"
              alt="Dining Experience"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
