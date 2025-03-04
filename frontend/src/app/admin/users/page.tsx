'use client';

import { useEffect, useState } from 'react';
import { getAllUsers, createUser, deleteUser } from '@/services/userService';
import AdminLayout from '@/components/admin/AdminLayout';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  createdAt: string;
}

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [adminUser, setAdminUser] = useState<User | null>(null); // Store logged-in admin user
  const router = useRouter();

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
  });

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token'); // ✅ Only access localStorage on client
        if (!token) {
          setError('Access denied. Please log in.');
          router.push('/login'); // Redirect if not logged in
          return;
        }

        // ✅ Simulate user verification (client-side only)
        const userData = JSON.parse(localStorage.getItem('user') || '{}');
        if (!userData || userData.role !== 'admin') {
          setError('Access denied.');
          router.push('/');
          return;
        }

        setAdminUser(userData); // ✅ Store admin user
        const data = await getAllUsers(token);
        setUsers(data);
      } catch (err: any) {
        setError(err?.response?.data?.error || 'Failed to fetch users.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [router]);

  const handleCreateUser = async () => {
    try {
      const token = localStorage.getItem('token') || '';
      const newUserAdded = await createUser(token, newUser);
      setUsers([...users, newUserAdded]);
      setNewUser({ name: '', email: '', password: '', role: 'user' });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      const token = localStorage.getItem('token') || '';
      await deleteUser(token, userId);
      setUsers(users.filter((user) => user.id !== userId));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p className="text-center text-lg">Loading users...</p>;

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold">Manage Users</h1>
      {error && <p className="text-red-500">{error}</p>}

      {/* ✅ Show admin info */}
      {adminUser && (
        <div className="mb-4 p-3 border bg-gray-100">
          <p>
            Logged in as: <strong>{adminUser.name}</strong> ({adminUser.email})
          </p>
        </div>
      )}

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Create User</h2>
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="password"
          placeholder="Password"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          className="border p-2 mr-2"
        />
        <select
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          className="border p-2 mr-2"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button
          onClick={handleCreateUser}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Create
        </button>
      </div>

      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Role</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="text-center">
              <td className="p-2 border">{user.name}</td>
              <td className="p-2 border">{user.email}</td>
              <td className="p-2 border">{user.role}</td>
              <td className="p-2 border">
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="bg-red-500 text-white px-4 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
};

export default UsersPage;
