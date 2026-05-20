import { useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../services/api";

import { toast } from "react-toastify";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // HANDLE CHANGE
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  // HANDLE REGISTER
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await API.post(
        "/auth/register",
        formData
      );

      toast.success("Registration successful");

      navigate("/login");

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Registration failed"
      );

    }

  };

  return (
    <div className="flex items-center justify-center py-20">

      <div className="bg-[#161616] p-10 rounded-2xl shadow-lg w-full max-w-md border border-gray-800">

        <h2 className="text-3xl font-bold mb-8 text-center">
          Create Account
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="text"
            name="name"
            placeholder="Enter name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-[#222] border border-gray-700 outline-none focus:border-cyan-400"
          />

          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-[#222] border border-gray-700 outline-none focus:border-cyan-400"
          />

          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-[#222] border border-gray-700 outline-none focus:border-cyan-400"
          />

          <button className="w-full bg-cyan-500 hover:bg-cyan-400 transition text-black font-bold py-4 rounded-xl">

            Register

          </button>

        </form>

      </div>

    </div>
  );
}

export default Register;