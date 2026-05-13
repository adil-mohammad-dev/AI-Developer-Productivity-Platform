"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    { name: "AI Code Review", href: "/review" },
    { name: "Review History", href: "/history" },
    { name: "GitHub Analyzer", href: "/github-analyzer" },
    { name: "README Generator", href: "/readme-generator" }
  ];

  return (
    <aside className="w-72 min-h-screen bg-gray-950 border-r border-gray-800 p-6">
      <h1 className="text-3xl font-bold mb-10 text-white">
        AI Dev Platform
      </h1>

      <div className="space-y-4">
        {links.map((link) => {
          const isActive = pathname === link.href;

          return (
            <Link href={link.href} key={link.href}>
              <div
                className={
                  isActive
                    ? "bg-white text-black p-4 rounded-xl font-semibold cursor-pointer"
                    : "bg-gray-900 p-4 rounded-xl text-gray-400 hover:bg-gray-800 cursor-pointer"
                }
              >
                {link.name}
              </div>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}