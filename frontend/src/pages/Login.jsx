import { useContext, useState } from "react";

import { useNavigate } from "react-router-dom";

import API from "../services/api";

import { AuthContext } from "../context/AuthContext";

import { toast } from "react-toastify";

function Login() {

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
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

  // HANDLE LOGIN
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const { data } = await API.post(
        "/auth/login",
        formData
      );

      login(data);

      toast.success("Login successful");

      navigate("/");

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Login failed"
      );

    }

  };

  return (
    <div className="flex items-center justify-center py-20">

      <div className="bg-[#161616] p-10 rounded-2xl shadow-lg w-full max-w-md border border-gray-800">

        <h2 className="text-3xl font-bold mb-8 text-center">
          Login
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

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

            Login

          </button>

        </form>

      </div>

    </div>
  );
}

export default Login;