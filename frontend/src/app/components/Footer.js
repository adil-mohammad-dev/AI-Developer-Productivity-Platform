"use client";

import { Github, Linkedin } from "lucide-react";

export default function Footer() {

  return (

    <footer className="border-t border-gray-800 mt-16 py-6 text-center text-gray-400">

      <div className="flex flex-col items-center gap-4">

        <p className="text-sm">
          Developed by{" "}
          <span className="text-white font-semibold">
            Mohammad Adil
          </span>
        </p>

        <div className="flex items-center gap-6">

          <a
            href="https://github.com/adil-mohammad-dev"
            target="_blank"
            className="hover:text-white transition"
          >
            <Github size={24} />
          </a>

          <a
            href="https://www.linkedin.com/in/mohammad-adil-dev/"
            target="_blank"
            className="hover:text-white transition"
          >
            <Linkedin size={24} />
          </a>

        </div>

      </div>

    </footer>

  );
}