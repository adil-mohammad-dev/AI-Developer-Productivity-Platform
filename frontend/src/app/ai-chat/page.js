"use client";

import { useState } from "react";
import Sidebar from "../components/Sidebar";
import ProtectedRoute from "../components/temp";
import toast from "react-hot-toast";

export default function AIChatPage() {
  const [message, setMessage] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function askAI() {
    if (!message.trim()) {
      toast.error("Please enter your question");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://ai-developer-productivity-platform.onrender.com/chat/ask",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message,
          }),
        }
      );

      const data = await response.json();
      setAnswer(data.answer);
      toast.success("AI response generated");
    } catch (error) {
      console.log(error);
      toast.error("Failed to get AI response");
    }

    setLoading(false);
  }

  function copyAnswer() {
    navigator.clipboard.writeText(answer);
    toast.success("Answer copied successfully");
  }

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-black text-white flex">
        <Sidebar />

        <section className="flex-1 p-10 overflow-auto">
          <h1 className="text-5xl font-bold mb-3">
            AI Chat Assistant
          </h1>

          <p className="text-gray-400 mb-10">
            Ask AI about code, bugs, optimization, documentation, and software engineering.
          </p>

          <div className="bg-gray-950 border border-gray-800 rounded-3xl p-8 mb-10">
            <textarea
              rows="8"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask something like: Explain this code, fix this bug, optimize this function..."
              className="w-full bg-black border border-gray-700 rounded-2xl p-5 mb-6 outline-none"
            />

            <button
              onClick={askAI}
              className="bg-white text-black px-8 py-4 rounded-2xl font-bold hover:bg-gray-200 transition"
            >
              {loading ? "Thinking..." : "Ask AI"}
            </button>
          </div>

          {answer && (
            <div className="bg-gray-950 border border-gray-800 rounded-3xl p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold">
                  AI Response
                </h2>

                <button
                  onClick={copyAnswer}
                  className="bg-white text-black px-5 py-2 rounded-xl font-semibold hover:bg-gray-200 transition"
                >
                  Copy
                </button>
              </div>

              <pre className="bg-black border border-gray-800 p-6 rounded-2xl overflow-auto text-green-400 whitespace-pre-wrap">
                {answer}
              </pre>
            </div>
          )}
        </section>
      </main>
    </ProtectedRoute>
  );
}