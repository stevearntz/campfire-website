"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Solutions", href: "/solutions" },
  { label: "Content", href: "/content" },
  { label: "Customers", href: "/customers" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Blog", href: "/blog" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/campfire-logo.webp"
            alt="Campfire"
            width={1862}
            height={396}
            className="h-8 w-auto"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 font-[family-name:var(--font-spartan)]">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-[1.05rem] font-medium pb-1 transition-colors ${
                  isActive
                    ? "text-[#6E3FCC]"
                    : "text-gray-600 hover:text-[#6E3FCC]"
                }`}
              >
                {link.label}
                <span
                  className={`absolute left-0 bottom-0 h-[2px] bg-[#6E3FCC] rounded-full transition-all duration-300 pointer-events-none ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
        </div>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-3 font-[family-name:var(--font-spartan)]">
          <a
            href="https://calendly.com/getcampfire/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 text-[1.05rem] font-semibold leading-none text-white bg-[#6E3FCC] rounded-lg hover:bg-[#5B34AB] transition-colors uppercase tracking-wide"
          >
            Get Demo
          </a>
          <a
            href="https://meet.getcampfire.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 text-[1.05rem] font-semibold leading-none text-gray-700 border border-gray-300 rounded-lg hover:border-[#6E3FCC] hover:text-[#6E3FCC] transition-colors uppercase tracking-wide"
          >
            Log In
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-3">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`block text-sm font-medium ${
                  isActive ? "text-[#6E3FCC]" : "text-gray-600 hover:text-[#6E3FCC]"
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="flex gap-3 pt-3 border-t border-gray-100">
            <a href="https://calendly.com/getcampfire/" target="_blank" rel="noopener noreferrer" className="px-5 py-2 text-sm font-semibold leading-none text-white bg-[#6E3FCC] rounded-lg">
              Get Demo
            </a>
            <a href="https://meet.getcampfire.com/" target="_blank" rel="noopener noreferrer" className="px-5 py-2 text-sm font-semibold leading-none text-gray-700 border border-gray-300 rounded-lg">
              Log In
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
