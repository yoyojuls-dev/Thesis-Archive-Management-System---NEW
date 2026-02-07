"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Close menu when pressing escape key
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  // Handle scrolling to sections on the same page
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      closeMenu();
    }
  };

  return (
    <div className="fixed top-6 right-6 z-50" ref={menuRef}>
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="w-12 h-12 bg-red-600 rounded-lg shadow-lg flex items-center justify-center hover:shadow-xl transition-all duration-300 hover:scale-105 hover:bg-red-700"
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        <div className="w-6 h-6 flex flex-col justify-center items-center">
          <span
            className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
              isOpen ? "rotate-45 translate-y-1" : "-translate-y-0.5"
            }`}
          ></span>
          <span
            className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${
              isOpen ? "opacity-0" : "opacity-100"
            }`}
          ></span>
          <span
            className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
              isOpen ? "-rotate-45 -translate-y-1" : "translate-y-0.5"
            }`}
          ></span>
        </div>
      </button>

      {/* Menu Dropdown */}
      <div
        className={`absolute top-16 right-0 w-56 bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden transform transition-all duration-300 ease-in-out origin-top-right ${
          isOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="py-2">
          {/* Home */}
          <button
            onClick={() => scrollToSection("hero")}
            className="w-full text-left px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors flex items-center gap-3"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Home
          </button>

          {/* About */}
          <button
            onClick={() => scrollToSection("about")}
            className="w-full text-left px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors flex items-center gap-3"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            About
          </button>

          {/* Department */}
          <button
            onClick={() => scrollToSection("departments")}
            className="w-full text-left px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors flex items-center gap-3"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            Department
          </button>

          {/* Category */}
          <button
            onClick={() => scrollToSection("categories")}
            className="w-full text-left px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors flex items-center gap-3"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            Category
          </button>

          <div className="border-t border-gray-200 my-2"></div>

          {/* Login/Signup */}
          <div className="px-4 py-2">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Access
            </div>
            
            <Link
              href="/student/login"
              onClick={closeMenu}
              className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors rounded-md mb-1"
            >
              Student Login
            </Link>
            
            <Link
              href="/admin/login"
              onClick={closeMenu}
              className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors rounded-md mb-1"
            >
              Faculty Login
            </Link>
            
            <Link
              href="/vpaa/login"
              onClick={closeMenu}
              className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors rounded-md"
            >
              VPAA Login
            </Link>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 -z-10"
          onClick={closeMenu}
        ></div>
      )}
    </div>
  );
};

export default HamburgerMenu;