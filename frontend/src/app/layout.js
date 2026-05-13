import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "AI Developer Productivity Platform",
  description: "AI-powered code review and developer productivity platform",
};

export default function RootLayout({ children }) {

  return (

    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >

      <body className="min-h-full flex flex-col bg-black text-white">

        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#111827",
              color: "#ffffff",
              border: "1px solid #374151",
              padding: "16px",
              borderRadius: "14px",
            },
          }}
        />

        {children}

      </body>

    </html>
  );
}