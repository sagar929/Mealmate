import React, { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({
    name: "",
    usermail: "",
    password: "",
    branch: "",
    role: "user",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (isRegister) {
      // Registration API call
      await axios.post("http://localhost:9000/api/user/register", form);
      alert("Registered! Please log in.");
      setIsRegister(false);
    } else {
      // Login API call
      const res = await axios.post("http://localhost:9000/api/user/login", {
        usermail: form.usermail,
        password: form.password,
      });
      // Add password to user object for frontend-only manager check
      login(res.data.token, { ...res.data.user, password: form.password });

      // Redirect manager to /manager, others to /book
      if (
        form.usermail === "thappa@gmail.com" &&
        form.password === "thappa"
      ) {
        navigate("/manager");
      } else {
        navigate("/book");
      }
    }
  } catch (err) {
    console.error(err);
    alert(
      err.response?.data?.message ||
      "Something went wrong. Please try again."
    );
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-green-300 to-green-500 px-4">
      <div className="bg-white rounded-3xl shadow-xl p-10 w-full max-w-md transition-all duration-500 ease-in-out">
        <h2 className="text-4xl font-extrabold text-center text-green-900 mb-8 tracking-tight">
          {isRegister ? "Create Your MealMate Account" : "Welcome Back 👋"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {isRegister && (
            <>
              <input
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none transition"
              />
              <input
                name="branch"
                placeholder="Your Branch"
                value={form.branch}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none transition"
              />
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none transition"
              >
                <option value="user">Student</option>
                <option value="messowner">Mess Manager</option>
              </select>
            </>
          )}

          <input
            name="usermail"
            type="email"
            placeholder="Email Address"
            value={form.usermail}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none transition"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none transition"
          />

          <button
            type="submit"
            className="w-full py-3 bg-green-800 text-white font-semibold rounded-lg hover:bg-green-700 hover:shadow-md transform hover:scale-[1.02] transition-all"
          >
            {isRegister ? "Sign Up" : "Log In"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          {isRegister ? "Already registered?" : "Don't have an account yet?"}
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="ml-2 text-green-700 font-semibold underline hover:text-green-900 transition"
          >
            {isRegister ? "Log In" : "Register"}
          </button>
        </p>
      </div>
    </div>
  );
}
