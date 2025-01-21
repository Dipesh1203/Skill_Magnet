"use client";
import { useState, useEffect } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "./context/AuthProvider";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar";
import { SunIcon, MoonIcon } from "lucide-react";
import ReactQueryProvider from "./utils/Providers/ReactQueryProvider";

const inter = Inter({ subsets: ["latin"] });

const metadata: Metadata = {
  title: "Skill Magnet",
  description: "Discover and showcase your skills like never before",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  return (
    <html lang="en" className={theme}>
      <body
        className={`${inter.className} bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
      >
        <ReactQueryProvider>
          <AuthProvider>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow pt-16">
                {" "}
                {/* Add padding-top to account for fixed navbar */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                  {/* Hero Section */}

                  {children}
                </div>
              </main>
              <footer className="bg-gray-200 dark:bg-gray-800 py-4 text-center">
                <p>&copy; 2024 Skill Magnet. All rights reserved.</p>
              </footer>
            </div>
            <Toaster />

            <button
              onClick={toggleTheme}
              className="fixed bottom-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <SunIcon className="h-6 w-6" />
              ) : (
                <MoonIcon className="h-6 w-6" />
              )}
            </button>
          </AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
