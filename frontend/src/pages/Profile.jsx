import React, { useState } from "react";
import { useSelector } from "react-redux";
import { IoMdClose } from "react-icons/io";
import avtar from "../assets/avtar.jpg";

const Profile = () => {
  const user = useSelector((state) => state?.userReducer?.user);

  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [image, setImage] = useState({
    image: "",
  });

  // Handle hover to show text
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  // Handle modal open/close
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image_url: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/employee",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(response?.data?.message); // Show success toast
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response?.data?.message); // Show error toast
    }
  };

  return (
    <div className="h-screen px-10 flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center relative">
        {/* Profile Picture */}
        <div
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={toggleModal}
        >
          <img
            className="w-40 h-40 rounded-full border-4 border-white shadow-md"
            src={avtar}
            alt="Profile"
          />
          {isHovered && (
            <div className="absolute inset-0 flex items-center justify-center cursor-pointer text-white text-lg font-semibold">
              Replace Image
            </div>
          )}
        </div>
        {user ? (
          <div className="mt-5 text-center">
            <h1 className="capitalize text-2xl font-semibold">Hey! {user.username}</h1>
            <p className="text-md text-neutral-500">{user.email}</p>
          </div>
        ) : null}
      </div>
      <div className="border border-black w-2/3 p-6 mx-auto mt-20">
         
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center"
          onClick={toggleModal} // Close modal when clicked outside
        >
          <div className="bg-white py-5 px-6 rounded-lg shadow-lg w-1/2 h-[500px] overflow-auto text-center">
            <div className="w-full h-10">
              <button className="float-end rounded-md" onClick={toggleModal}>
                <IoMdClose className="text-2xl cursor-pointer" />
              </button>
            </div>
            <div className="flex flex-col justify-center items-center mt-5">
              <h2 className="text-2xl mb-4">Profile Picture</h2>
              <img
                className="w-40 h-40 rounded-full"
                src={avtar}
                alt="Profile"
              />
              <div className="flex items-center space-x-10 mt-5">
                <button className="py-3 px-6 bg-[#7C78EB] rounded-3xl text-white">
                  Delete
                </button>
                <button className="py-3 px-6 bg-[#7C78EB] rounded-3xl text-white">
                  Upload
                </button>
                <button className="py-3 px-6 bg-[#7C78EB] rounded-3xl text-white">
                  Change
                </button>
              </div>
              <div className="mt-5">
                <p>Supported file format: png, jpg, jpeg, gif - upto 2MB</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
