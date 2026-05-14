"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const links = [
    { name: "AI Code Review", href: "/review" },
    { name: "Review History", href: "/history" },
    { name: "GitHub Analyzer", href: "/github-analyzer" },
    { name: "README Generator", href: "/readme-generator" },
    { name: "AI Chat Assistant", href: "/ai-chat" }
  ];

  function handleLogout() {
    localStorage.removeItem("token");
    router.push("/login");
  }

  return (
    <aside className="w-full md:w-72 md:min-h-screen bg-gray-950 border-b md:border-b-0 md:border-r border-gray-800 p-4 md:p-6 flex flex-col md:justify-between">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold mb-5 md:mb-10 text-white">
          AI Dev Platform
        </h1>

        <div className="flex md:flex-col gap-3 md:gap-4 overflow-x-auto pb-2 md:pb-0">
          {links.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link href={link.href} key={link.href}>
                <div
                  className={
                    isActive
                      ? "whitespace-nowrap bg-white text-black px-4 py-3 md:p-4 rounded-xl font-semibold cursor-pointer"
                      : "whitespace-nowrap bg-gray-900 px-4 py-3 md:p-4 rounded-xl text-gray-400 hover:bg-gray-800 cursor-pointer"
                  }
                >
                  {link.name}
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="mt-4 md:mt-8 w-full bg-red-500/20 text-red-400 p-3 md:p-4 rounded-xl font-semibold hover:bg-red-500/30"
      >
        Logout
      </button>
    </aside>
  );
}