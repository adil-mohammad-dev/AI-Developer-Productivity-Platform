"use client";

import { useState } from "react";
import Sidebar from "../components/Sidebar";
import ProtectedRoute from "../components/temp";

export default function ReviewPage() {

  const [language, setLanguage] = useState("python");

  const [code, setCode] = useState("");

  const [review, setReview] = useState(null);

  const [loading, setLoading] = useState(false);


  async function analyzeCode() {

    if (code.trim() === "") {
      alert("Please enter code");
      return;
    }

    setLoading(true);

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/reviews/code",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            language,
            code,
          }),
        }
      );

      const data = await response.json();

      setReview(data.review);

    } catch (error) {

      console.log(error);

      alert("Backend connection failed");

    }

    setLoading(false);
  }

  return (

    <ProtectedRoute>

    <main className="min-h-screen bg-black text-white flex">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <section className="flex-1 p-10 overflow-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-10">

          <div>

            <h1 className="text-5xl font-bold mb-3">
              AI Code Review
            </h1>

            <p className="text-gray-400">
              Analyze and improve your code using AI.
            </p>

          </div>

        </div>

        {/* Input Section */}
        <div className="bg-gray-950 border border-gray-800 rounded-3xl p-8 mb-10">

          <h2 className="text-2xl font-semibold mb-6">
            Submit Your Code
          </h2>

          {/* Language */}
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full bg-black border border-gray-700 rounded-xl p-4 mb-6 outline-none"
          >

            <option value="python">Python</option>

            <option value="javascript">JavaScript</option>

            <option value="java">Java</option>

            <option value="cpp">C++</option>

          </select>

          {/* Code Area */}
          <textarea
            rows="14"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Paste your code here..."
            className="w-full bg-black border border-gray-700 rounded-2xl p-6 mb-6 outline-none font-mono"
          />

          {/* Button */}
          <button
            type="button"
            onClick={analyzeCode}
            className="bg-white text-black px-8 py-4 rounded-2xl font-bold hover:bg-gray-200 transition"
          >

            {
              loading
                ? "Analyzing..."
                : "Analyze Code"
            }

          </button>

        </div>

        {/* Review Result */}
        {
          review && (

            <div className="bg-gray-950 border border-gray-800 rounded-3xl p-8">

              <div className="flex justify-between items-center mb-10">

                <h2 className="text-3xl font-bold">
                  AI Review Result
                </h2>

                <div className="bg-green-500/20 text-green-400 px-5 py-3 rounded-2xl text-xl font-bold">
                  {review.score}/10
                </div>

              </div>

              <div className="space-y-8">

                {/* Summary */}
                <div>

                  <h3 className="text-2xl font-semibold mb-3">
                    Summary
                  </h3>

                  <p className="text-gray-300">
                    {review.summary}
                  </p>

                </div>

                {/* Security */}
                <div>

                  <h3 className="text-2xl font-semibold mb-3 text-red-400">
                    Security Issues
                  </h3>

                  <ul className="list-disc pl-6 text-gray-300 space-y-2">

                    {
                      review.security_issues?.map((issue, index) => (
                        <li key={index}>
                          {issue}
                        </li>
                      ))
                    }

                  </ul>

                </div>

                {/* Bugs */}
                <div>

                  <h3 className="text-2xl font-semibold mb-3 text-yellow-400">
                    Bugs
                  </h3>

                  <ul className="list-disc pl-6 text-gray-300 space-y-2">

                    {
                      review.bugs?.map((bug, index) => (
                        <li key={index}>
                          {bug}
                        </li>
                      ))
                    }

                  </ul>

                </div>

                {/* Improved Code */}
                <div>

                  <h3 className="text-2xl font-semibold mb-3 text-green-400">
                    Improved Code
                  </h3>

                  <pre className="bg-black border border-gray-800 p-6 rounded-2xl overflow-auto text-green-400">
                    {review.improved_code}
                  </pre>

                </div>

                {/* Explanation */}
                <div>

                  <h3 className="text-2xl font-semibold mb-3">
                    Explanation
                  </h3>

                  <p className="text-gray-300">
                    {review.explanation}
                  </p>

                </div>

              </div>

            </div>

          )
        }

      </section>

    </main>
    </ProtectedRoute>
  );
}