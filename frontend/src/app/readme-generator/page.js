"use client";

import { useState } from "react";
import Sidebar from "../components/Sidebar";
import ProtectedRoute from "../components/temp";
import Footer from "../components/Footer";
import toast from "react-hot-toast";

export default function ReadmeGeneratorPage() {

  const [projectName, setProjectName] = useState("");

  const [description, setDescription] = useState("");

  const [techStack, setTechStack] = useState("");

  const [features, setFeatures] = useState("");

  const [readme, setReadme] = useState("");

  const [loading, setLoading] = useState(false);

  function copyReadme() {
  navigator.clipboard.writeText(readme);
  toast.success("README copied successfully");
}
  function downloadReadme() {
  const blob = new Blob([readme], {
    type: "text/markdown"
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "README.md";
  link.click();

  URL.revokeObjectURL(url);

  toast.success("README downloaded successfully");
}

  async function generateReadme() {

    if (!projectName || !description || !techStack || !features) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);

    try {

      const response = await fetch(
        "https://ai-developer-productivity-platform.onrender.com/readme/generate",
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

      toast.error("Failed to generate README");

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

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-3xl font-bold">
          Generated README
        </h2>

        <button
          onClick={copyReadme}
          className="bg-white text-black px-5 py-2 rounded-xl font-semibold hover:bg-gray-200 transition"
        >
          Copy README
        </button>
        <button
  onClick={downloadReadme}
  className="border border-gray-700 px-5 py-2 rounded-xl font-semibold hover:bg-gray-900 transition"
>
  Download README
</button>

      </div>

      <pre className="bg-black border border-gray-800 p-6 rounded-2xl overflow-auto text-green-400 whitespace-pre-wrap">
        {readme}
      </pre>

    </div>

  )
}

        </section>
        <Footer />

      </main>

    </ProtectedRoute>
  );
}