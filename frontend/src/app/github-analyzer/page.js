"use client";

import { useState } from "react";
import Sidebar from "../components/Sidebar";
import ProtectedRoute from "../components/temp";
import Footer from "../components/Footer";
import toast from "react-hot-toast";

export default function GithubAnalyzerPage() {

  const [repoUrl, setRepoUrl] = useState("");

  const [result, setResult] = useState(null);

  const [loading, setLoading] = useState(false);

  async function analyzeRepository() {

    if (repoUrl.trim() === "") {
      toast.error("Please enter GitHub repository URL");
      return;
    }

    setLoading(true);

    try {

      const response = await fetch(
        "https://ai-developer-productivity-platform.onrender.com/github/analyze",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            repo_url: repoUrl
          })
        }
      );

      const data = await response.json();

      setResult(data);

    } catch (error) {

      console.log(error);

      toast.error("Failed to analyze repository");

    }

    setLoading(false);
  }

  return (

    <ProtectedRoute>

      <main className="min-h-screen bg-black text-white flex flex-col md:flex-row">

        <Sidebar />

        <section className="flex-1 p-10 overflow-auto">

          <div className="mb-10">

            <h1 className="text-5xl font-bold mb-3">
              GitHub Repository Analyzer
            </h1>

            <p className="text-gray-400">
              Analyze GitHub repositories using AI.
            </p>

          </div>

          <div className="bg-gray-950 border border-gray-800 rounded-3xl p-8 mb-10">

            <h2 className="text-2xl font-semibold mb-6">
              Repository URL
            </h2>

            <input
              type="text"
              placeholder="https://github.com/vercel/next.js"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              className="w-full bg-black border border-gray-700 rounded-2xl p-5 mb-6 outline-none"
            />

            <button
              onClick={analyzeRepository}
              className="bg-white text-black px-8 py-4 rounded-2xl font-bold hover:bg-gray-200 transition"
            >

              {
                loading
                  ? "Analyzing..."
                  : "Analyze Repository"
              }

            </button>

          </div>

          {
            result && (

              <div className="space-y-8">

                <div className="bg-gray-950 border border-gray-800 rounded-3xl p-8">

                  <h2 className="text-3xl font-bold mb-6">
                    Repository Details
                  </h2>

                  <div className="space-y-4">

                    <p>
                      <span className="font-semibold">
                        Name:
                      </span>{" "}
                      {result.repository.name}
                    </p>

                    <p>
                      <span className="font-semibold">
                        Description:
                      </span>{" "}
                      {result.repository.description}
                    </p>

                    <p>
                      <span className="font-semibold">
                        Language:
                      </span>{" "}
                      {result.repository.language}
                    </p>

                    <p>
                      <span className="font-semibold">
                        Stars:
                      </span>{" "}
                      {result.repository.stars}
                    </p>

                    <p>
                      <span className="font-semibold">
                        Forks:
                      </span>{" "}
                      {result.repository.forks}
                    </p>

                  </div>

                </div>

                <div className="bg-gray-950 border border-gray-800 rounded-3xl p-8">

                  <h2 className="text-3xl font-bold mb-8">
                    AI Analysis
                  </h2>

                  <div className="space-y-8">

                    <div>

                      <h3 className="text-2xl font-semibold mb-3">
                        Summary
                      </h3>

                      <p className="text-gray-300">
                        {result.analysis.summary}
                      </p>

                    </div>

                    <div>

                      <h3 className="text-2xl font-semibold mb-3">
                        Tech Stack
                      </h3>

                      <div className="flex flex-wrap gap-3">

                        {
                          result.analysis.tech_stack?.map((tech, index) => (

                            <div
                              key={index}
                              className="bg-green-500/20 text-green-400 px-4 py-2 rounded-xl"
                            >
                              {tech}
                            </div>

                          ))
                        }

                      </div>

                    </div>

                    <div>

                      <h3 className="text-2xl font-semibold mb-3 text-green-400">
                        Strengths
                      </h3>

                      <ul className="list-disc pl-6 text-gray-300 space-y-2">

                        {
                          result.analysis.strengths?.map((item, index) => (
                            <li key={index}>
                              {item}
                            </li>
                          ))
                        }

                      </ul>

                    </div>

                  </div>

                </div>

              </div>

            )
          }

        </section>
        <Footer />

      </main>

    </ProtectedRoute>
  );
}