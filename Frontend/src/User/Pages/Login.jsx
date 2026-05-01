import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {

    e.preventDefault();

    try {

      const res = await fetch("http://localhost:5050/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      });

      const data = await res.json();

      if (res.ok) {

        if (data.token && data.user) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
        }

        // show toast for short time
        toast.success("Login Successful 🚀", {
          autoClose: 1000
        });

        // dismiss toast before navigating
        setTimeout(() => {

          toast.dismiss();

          if (data.user?.isAdmin) {
            navigate("/admin/dashboard");
          } else {
            navigate("/");
          }

        }, 1000);

      } else {

        toast.error(data.message);

      }

    } catch (error) {

      console.error(error);
      toast.error("Server Error");

    }

  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl px-8 py-10">

        <h2 className="text-3xl font-semibold text-black text-center tracking-wide">
          Welcome Back
        </h2>

        <p className="text-sm text-gray-500 text-center mt-2 mb-8">
          Login to your Western Ivy account
        </p>

        <form className="space-y-5" onSubmit={handleSubmit}>

          <input
            type="email"
            placeholder="Email address"
            className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-red-500 text-white py-3 rounded-md text-sm tracking-wide hover:bg-red-700 transition"
          >
            Login
          </button>

        </form>

        <p className="text-sm text-center mt-6 text-gray-600">
          Don’t have an account?
          <Link
            to="/signup"
            className="ml-1 text-black font-semibold hover:underline"
          >
            Sign up
          </Link>
        </p>

      </div>

    </div>
  );
};

export default Login;