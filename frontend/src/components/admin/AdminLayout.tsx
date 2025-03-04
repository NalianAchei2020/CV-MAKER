'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { verifyToken, logout } from '@/services/authService';
import { User } from '@/types';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const router = useRouter();
  const user: User | null = verifyToken(); // Get user from token

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      router.push('/'); // Redirect non-admins to home page
    }
  }, [user, router]);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-6">
        <h2 className="text-xl font-bold mb-6">Admin Dashboard</h2>
        <nav>
          <ul className="space-y-4">
            <li>
              <Link
                href="/admin/users"
                className="block p-2 hover:bg-gray-700 rounded"
              >
                Users
              </Link>
            </li>
            <li>
              <Link
                href="/admin/finances"
                className="block p-2 hover:bg-gray-700 rounded"
              >
                Finances
              </Link>
            </li>
            <li>
              <Link
                href="/admin/create-template"
                className="block p-2 hover:bg-gray-700 rounded"
              >
                Create Template
              </Link>
            </li>
            <li>
              <Link
                href="/admin/manage-templates"
                className="block p-2 hover:bg-gray-700 rounded"
              >
                Manage Templates
              </Link>
            </li>
            <li>
              <Link
                href="/admin/manage-cover-letters"
                className="block p-2 hover:bg-gray-700 rounded"
              >
                Manage Cover Letters
              </Link>
            </li>
            <li>
              <Link
                href="/admin/cover-letters"
                className="block p-2 hover:bg-gray-700 rounded"
              >
                Create Cover Letter
              </Link>
            </li>
            <li>
              <button
                onClick={() => {
                  logout();
                  router.push('/');
                }}
                className="w-full text-left p-2 bg-red-500 hover:bg-red-600 rounded"
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
};

export default AdminLayout;
