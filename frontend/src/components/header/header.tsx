'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { verifyToken, logout } from '@/services/authService';
import LoginModal from '@/components/auth/LoginModal';
import SignupModal from '@/components/auth/SignupModal';
import { User } from '@/types';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState<boolean>(false);
  const router = useRouter();

  // ✅ Load user data from local storage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // ✅ Logout function
  const handleLogout = () => {
    logout();
    setUser(null);
    router.push('/');
  };

  // ✅ Menu links
  const menuItems = [
    { href: '/', label: 'HOME' },
    { href: '/about', label: 'ABOUT' },
    { href: '/pricing', label: 'PRICING' },
    { href: '/templates', label: 'TEMPLATES' },
    { href: '/pages/resume', label: 'RESUME' },

    { href: '/contact', label: 'CONTACT' },
  ];

  return (
    <>
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
              {user ? (
                <>
                  <li>
                    <span className="font-bold">{user.name}</span>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="bg-red-500 border-2 border-red-600 py-2 px-6 rounded-lg text-white text-sm"
                    >
                      LOGOUT
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <button
                      onClick={() => setIsLoginModalOpen(true)}
                      className="bg-[#3e94e4] border-2 border-blue-600 py-2 px-6 rounded-lg text-white text-sm"
                    >
                      LOGIN
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setIsSignupModalOpen(true)}
                      className="bg-green-500 border-2 border-green-600 py-2 px-6 rounded-lg text-white text-sm"
                    >
                      SIGNUP
                    </button>
                  </li>
                </>
              )}
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
        {isMenuOpen && (
          <div className="fixed inset-0 bg-[#beedf2] z-40 transition-transform duration-300 ease-in-out lg:hidden">
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
                  {user ? (
                    <>
                      <button className="w-full bg-[#3e94e4] border-2 border-blue-600 py-3 px-6 rounded-lg text-white text-sm font-bold">
                        {user.name}
                      </button>
                      <button
                        onClick={() => {
                          setIsMenuOpen(false);
                          handleLogout();
                        }}
                        className="w-full bg-red-500 border-2 border-red-600 py-3 px-6 rounded-lg text-white text-sm font-bold"
                      >
                        LOGOUT
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          setIsMenuOpen(false);
                          setIsLoginModalOpen(true);
                        }}
                        className="w-full bg-[#3e94e4] border-2 border-blue-600 py-3 px-6 rounded-lg text-white text-sm font-bold"
                      >
                        LOGIN
                      </button>
                      <button
                        onClick={() => {
                          setIsMenuOpen(false);
                          setIsSignupModalOpen(true);
                        }}
                        className="w-full bg-green-500 border-2 border-green-600 py-3 px-6 rounded-lg text-white text-sm font-bold"
                      >
                        SIGNUP
                      </button>
                    </>
                  )}
                </div>
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* Login & Signup Modals */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onUserLogin={setUser}
      />
      <SignupModal
        isOpen={isSignupModalOpen}
        onClose={() => setIsSignupModalOpen(false)}
      />
    </>
  );
};

export default Header;
