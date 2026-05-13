"use client";

import { useState } from "react";
import Sidebar from "../components/Sidebar";
import ProtectedRoute from "../components/temp";

export default function ReadmeGeneratorPage() {

  const [projectName, setProjectName] = useState("");

  const [description, setDescription] = useState("");

  const [techStack, setTechStack] = useState("");

  const [features, setFeatures] = useState("");

  const [readme, setReadme] = useState("");

  const [loading, setLoading] = useState(false);


  async function generateReadme() {

    if (!projectName || !description || !techStack || !features) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/readme/generate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            project_name: projectName,
            description,
            tech_stack: techStack,
            features
          })
        }
      );

      const data = await response.json();

      setReadme(data.readme);

    } catch (error) {

      console.log(error);

      alert("Failed to generate README");

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

          <h1 className="text-5xl font-bold mb-3">
            README Generator
          </h1>

          <p className="text-gray-400 mb-10">
            Generate professional GitHub README files using AI.
          </p>

          {/* Form */}
          <div className="bg-gray-950 border border-gray-800 rounded-3xl p-8 mb-10">

            <input
              className="w-full bg-black border border-gray-700 rounded-xl p-4 mb-5"
              placeholder="Project Name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />

            <textarea
              className="w-full bg-black border border-gray-700 rounded-xl p-4 mb-5"
              rows="4"
              placeholder="Project Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <input
              className="w-full bg-black border border-gray-700 rounded-xl p-4 mb-5"
              placeholder="Tech Stack e.g. FastAPI, Next.js, PostgreSQL"
              value={techStack}
              onChange={(e) => setTechStack(e.target.value)}
            />

            <textarea
              className="w-full bg-black border border-gray-700 rounded-xl p-4 mb-5"
              rows="4"
              placeholder="Features e.g. AI code review, GitHub analyzer"
              value={features}
              onChange={(e) => setFeatures(e.target.value)}
            />

            <button
              onClick={generateReadme}
              className="bg-white text-black px-8 py-4 rounded-2xl font-bold hover:bg-gray-200 transition"
            >

              {
                loading
                  ? "Generating..."
                  : "Generate README"
              }

            </button>

          </div>

          {/* README Output */}
          {
            readme && (

              <div className="bg-gray-950 border border-gray-800 rounded-3xl p-8">

                <h2 className="text-3xl font-bold mb-6">
                  Generated README
                </h2>

                <pre className="bg-black border border-gray-800 p-6 rounded-2xl overflow-auto text-green-400 whitespace-pre-wrap">
                  {readme}
                </pre>

              </div>

            )
          }

        </section>

      </main>

    </ProtectedRoute>
  );
}