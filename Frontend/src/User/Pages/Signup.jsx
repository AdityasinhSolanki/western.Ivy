import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {

  const navigate = useNavigate()

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function handleSubmit(e) {
    e.preventDefault()

    console.log("Signup button clicked")

    // EMAIL VALIDATION
    if (!email.endsWith("@gmail.com")) {
      toast.error("Only Gmail accounts are allowed")
      return
    }

    // PASSWORD VALIDATION
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])/;

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters")
      return
    }

    if (!passwordRegex.test(password)) {
      toast.error("Password must contain 1 uppercase letter and 1 special character")
      return
    }

    try {

      const res = await fetch("http://localhost:5050/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: username,
          email: email,
          password: password
        })
      })

      const data = await res.json()

      console.log("Server response:", data)

      if (res.ok) {

        if (data.token) {
          localStorage.setItem("token", data.token)
        }

        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user))
        }

        toast.success("Account created successfully 🚀", {
          onClose: () => navigate("/")
        })

        setUsername("")
        setEmail("")
        setPassword("")

      } else {
        toast.error(data.message)
      }

    } catch (error) {
      console.error(error)
      toast.error("Server error")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl px-8 py-10">

        <h2 className="text-3xl font-semibold text-center text-black tracking-wide">
          Create Account
        </h2>

        <p className="text-sm text-gray-500 text-center mt-2 mb-8">
          Join Western Ivy today
        </p>

        <form className="space-y-5" onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Username"
            className="w-full border border-gray-300 px-4 py-3 rounded-md text-sm focus:outline-none focus:border-black"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 px-4 py-3 rounded-md text-sm focus:outline-none focus:border-black"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 px-4 py-3 rounded-md text-sm focus:outline-none focus:border-black"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-red-500 text-white py-3 rounded-md text-sm tracking-wide hover:bg-red-700 transition"
          >
            Signup
          </button>

        </form>

      </div>

    </div>
  )
}

export default Signup