"use client"; // Ensuring this component is rendered on the client-side

import { useState } from "react";
import Link from "next/link";
import MainNav from "@/components/main-nav";
import NavbarActions from "./navbar-actions";
import { Billboard } from "@/types";

interface Category {
  id: string;
  image: string;
  name: string;
  billboard: Billboard;
}

interface NavbarClientProps {
  categories: Category[];
}

const NavbarClient: React.FC<NavbarClientProps> = ({ categories }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="border-b fixed top-0 left-0 w-full bg-white z-50 shadow-sm">
      <div className="relative px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Store Name - Visible on all views */}
        <div className="flex items-center justify-start md:justify-center md:absolute md:left-0 w-full md:w-auto">
          <Link href="/" className="flex gap-x-2">
            <div className="font-bold text-xl sm:ml-3 lg:ml-5">STORE</div>
          </Link>
        </div>

        {/* Main Navigation - Desktop */}
        <div className="hidden md:flex flex-grow justify-center">
          {/* Adjust MainNav to display categories in columns */}
          <MainNav data={categories} />
        </div>

        {/* Mobile Menu Button (Hamburger Icon) */}
        <div className="md:hidden flex items-center absolute right-4">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex flex-col items-center justify-center space-y-1"
          >
            <span
              className={`block w-6 h-0.5 bg-black transition-all duration-300 ${
                isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-black transition-all duration-300 ${
                isMobileMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-black transition-all duration-300 ${
                isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            ></span>
          </button>
        </div>

        {/* Cart (Navbar Actions) - Positioned in its own section for mobile */}
        <div className="md:hidden absolute right-16">
          <NavbarActions />
        </div>

        {/* Navbar Actions (Cart, etc.) - Desktop */}
        <div className="hidden md:flex items-center">
          <NavbarActions />
        </div>
      </div>

      {/* Mobile Overlay Background */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={() => setIsMobileMenuOpen(false)} // Clicking the overlay will close the menu
        ></div>
      )}

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 transform ease-in-out ${
          isMobileMenuOpen
            ? "translate-x-0 opacity-100 z-50"
            : "translate-x-full opacity-0"
        } absolute top-16 left-0 w-full bg-white shadow-md`}
        style={{ maxHeight: "calc(100vh - 64px)", overflowY: "auto" }}
      >
        {/* Categories for mobile */}
        <div className="px-4 py-2">
          <MainNav data={categories} />
        </div>
      </div>
    </div>
  );
};

export default NavbarClient;
