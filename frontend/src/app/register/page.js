"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Footer from "../components/Footer";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister() {
    if (!name || !email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const response = await fetch("https://ai-developer-productivity-platform.onrender.com/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.detail || "Registration failed");
        return;
      }

      alert("Registration successful");
      router.push("/login");
    } catch (error) {
      console.log(error);
      alert("Backend connection failed");
    }
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-gray-950 border border-gray-800 rounded-3xl p-8">
        <h1 className="text-4xl font-bold mb-3">Create Account</h1>
        <p className="text-gray-400 mb-8">
          Join AI Developer Productivity Platform.
        </p>

        <input
          className="w-full bg-black border border-gray-700 rounded-xl p-4 mb-5"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full bg-black border border-gray-700 rounded-xl p-4 mb-5"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full bg-black border border-gray-700 rounded-xl p-4 mb-6"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleRegister}
          className="w-full bg-white text-black py-4 rounded-xl font-bold"
        >
          Register
        </button>

        <p className="text-gray-400 mt-6 text-center">
          Already have an account?{" "}
          <Link href="/login" className="text-white font-semibold">
            Login
          </Link>
        </p>
      </div>
        <Footer />
    </main>
  );
}