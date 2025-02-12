'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { href: '#home', label: 'HOME' },
    { href: '#about', label: 'ABOUT US' },
    { href: '#pricing', label: 'PRICING' },
    { href: '#templates', label: 'TEMPLATES' },
    { href: '#contact', label: 'CONTACT' },
  ];

  return (
    <header className="relative">
      <div className="flex flex-row justify-between pt-5 px-10 bg-[#beedf2]">
        <div className="logo space-x-2 mt-[-4em]">
          <Image
            src="/Images/logo.png"
            alt="logo"
            width={150}
            height={20}
            className="object-contain"
            priority
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:block">
          <ul className="flex space-x-4 text-sm font-bold">
            {menuItems.map((item) => (
              <li key={item.href} className="py-[8px]">
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
            <li>
              <button className="login-button bg-[#3e94e4] border-2 border-blue-600 py-2 px-6 rounded-lg text-white text-sm">
                LOGIN
              </button>
            </li>
            <li>
              <button className="signup-button bg-[#3e94e4] border-2 border-blue-600 py-2 px-6 rounded-lg text-white text-sm">
                SIGNUP
              </button>
            </li>
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 z-50 text-[2rem] mt-[-1.2em]"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6 text-[2rem]" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation Overlay */}
      <div
        className={`fixed inset-0 bg-[#beedf2] z-40 transform transition-transform duration-300 ease-in-out lg:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full p-10 pt-24">
          <nav className="space-y-8">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block text-xl font-semibold hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex flex-col space-y-4 pt-8">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="w-full bg-[#3e94e4] border-2 border-blue-600 py-3 px-6 rounded-lg text-white text-sm font-bold"
              >
                LOGIN
              </button>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="w-full bg-[#3e94e4] border-2 border-blue-600 py-3 px-6 rounded-lg text-white text-sm font-bold"
              >
                SIGNUP
              </button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
