import Link from "next/link";
import Footer from "./components/Footer";

import {
  Code,
  ShieldCheck,
  Bug,
  GitBranch
} from "lucide-react";

export default function Home() {

  const features = [
    {
      icon: <Code size={32} />,
      title: "AI Code Review",
      description: "Analyze code quality using Groq-powered AI."
    },
    {
      icon: <Bug size={32} />,
      title: "Bug Detection",
      description: "Detect bugs and vulnerabilities instantly."
    },
    {
      icon: <ShieldCheck size={32} />,
      title: "Performance Optimization",
      description: "Improve performance with AI suggestions."
    },
    {
      icon: <GitBranch size={32} />,
      title: "GitHub Analyzer",
      description: "Analyze repositories and generate insights."
    }
  ];

  return (
    <main className="min-h-screen bg-black text-white">

      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-6 border-b border-gray-800">

        <h1 className="text-2xl font-bold">
          AI Dev Platform
        </h1>

        <Link href="/login">
          <button className="bg-white text-black px-5 py-2 rounded-lg font-medium hover:bg-gray-200 transition">
            Get Started
          </button>
        </Link>

      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-6 md:py-8 px-6">

        <h1 className="text-4xl md:text-5xl font-bold max-w-5xl leading-tight mb-6">
  AI-Powered Developer Productivity Platform
</h1>

        <p className="text-gray-400 text-lg md:text-xl max-w-3xl mb-10">
          Analyze code, detect bugs, optimize performance,
          review repositories, and generate developer insights using AI.
        </p>

        <div className="flex gap-5">

          <Link href="/login">
            <button className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition">
              Start Reviewing
            </button>
          </Link>

          <a href="#features">
            <button className="border border-gray-700 px-6 py-3 rounded-xl hover:bg-gray-900 transition">
              View Features
            </button>
          </a>

        </div>

      </section>

      {/* Features */}
      <section
        id="features"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-10 pb-2"
      >

        {features.map((feature, index) => (

          <div
            key={index}
            className="border border-gray-800 rounded-2xl p-6 bg-gray-950 hover:border-gray-600 transition"
          >

            <div className="mb-4 text-white">
              {feature.icon}
            </div>

            <h2 className="text-xl font-semibold mb-3">
              {feature.title}
            </h2>

            <p className="text-gray-400">
              {feature.description}
            </p>

          </div>

        ))}

      </section>
      <Footer />

    </main>
  );
}