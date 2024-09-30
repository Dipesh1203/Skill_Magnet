"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import profileImage from "./../../public/assets/hero/heroImage.png";
import { MenuIcon, XIcon } from "lucide-react"; // Replace with your icons or use another library

const Navigation = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const items = [
    { href: "/", label: "Home" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/project/", label: "Explore" },
    { href: "/profile", label: "Profile" },
  ];

  return (
    <nav className="bg-transparent z-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left section: Logo and Menu for larger screens */}
          <div className="flex-shrink-0">
            {/* Logo or branding */}
            <h1 className="text-2xl font-extrabold font-outfit">
              Skill Magnet
            </h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <ul className="flex space-x-6">
              {items.map((item) => (
                <li
                  key={item.href}
                  className="text-xl font-outfit font-extrabold p-2"
                >
                  <Link href={item.href} legacyBehavior passHref>
                    <a className="hover:text-blue-500">{item.label}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right section: Profile or Sign in */}
          <div className="hidden md:flex items-center">
            {session ? (
              <div className="flex items-center space-x-4">
                <Image
                  src={
                    session?.user?.image || `/public/assets/hero/heroImage.png`
                  } // Fallback to default image if session.user.image is undefined
                  alt="User profile image"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <button
                  onClick={() => signOut()}
                  className="font-outfit font-bold"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <button
                onClick={() => signIn()}
                className="font-outfit font-bold"
              >
                Sign in
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-500 hover:text-gray-900 focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <XIcon className="h-6 w-6" aria-hidden="true" />
              ) : (
                <MenuIcon className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden z-50 relative">
          <ul className="space-y-1 px-2 pb-3">
            {items.map((item) => (
              <li key={item.href}>
                <Link href={item.href} legacyBehavior passHref>
                  <a className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 hover:text-white">
                    {item.label}
                  </a>
                </Link>
              </li>
            ))}

            {/* Mobile Profile */}
            <div className="border-t border-gray-700 mt-2 pt-2">
              {session ? (
                <div className="flex items-center space-x-2 px-4">
                  <Image
                    src={session?.user?.image || `${profileImage}`}
                    alt="User profile image"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <button
                    onClick={() => signOut()}
                    className="text-white font-medium block w-full text-left"
                  >
                    Sign out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => signIn()}
                  className="w-full text-left px-3 py-2 rounded-md text-base font-medium"
                >
                  Sign in
                </button>
              )}
            </div>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
