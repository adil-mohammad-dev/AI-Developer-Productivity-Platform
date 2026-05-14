"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const response = await fetch(
        "https://ai-developer-productivity-platform.onrender.com/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.detail || "Login failed");
        return;
      }

      localStorage.setItem("token", data.access_token);

      toast.success("Login successful");
      router.push("/review");
    } catch (error) {
      console.log(error);
      toast.error("Backend connection failed");
    }
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md bg-gray-950 border border-gray-800 rounded-3xl p-6 sm:p-8">
        <h1 className="text-4xl font-bold mb-3">
          Login
        </h1>

        <p className="text-gray-400 mb-8">
          Access your AI developer dashboard.
        </p>

        <input
          className="w-full bg-black border border-gray-700 rounded-xl p-4 mb-5 outline-none"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full bg-black border border-gray-700 rounded-xl p-4 mb-6 outline-none"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-white text-black py-4 rounded-xl font-bold hover:bg-gray-200 transition"
        >
          Login
        </button>

        <p className="text-gray-400 mt-6 text-center">
          New user?{" "}
          <Link href="/register" className="text-white font-semibold">
            Register
          </Link>
        </p>
      </div>
    </main>
  );
}