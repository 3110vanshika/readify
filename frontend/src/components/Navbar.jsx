import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import avtar from '../assets/avtar.jpg'
import { useDispatch, useSelector } from 'react-redux'
import { getUserFromSessionStorage, logout } from "../redux/user/action";


const Navbar = () => {
  const user = useSelector((state) => state?.userReducer?.user)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
  }, []);

  useEffect(() => {
    dispatch(getUserFromSessionStorage())
  }, [])

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    dispatch(logout());
    navigate("/signin");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="py-5 px-5 lg:px-0">
      <div className="container max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold">Readify</h1>
          </div>

          <div className="flex items-center space-x-8">
            {user ? (
              <div className="relative">
                <img
                  src={avtar}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full cursor-pointer"
                  onClick={toggleDropdown}
                />
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md z-10">
                    <ul>
                      <li>
                        <Link
                          to="/view-profile"
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          View profile
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/signin"
                  className="border border-[#7C78EB] text-[#7C78EB] rounded py-2 px-8"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-[#7C78EB] text-white rounded py-2 px-8"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
