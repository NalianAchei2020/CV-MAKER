'use client';

import { useEffect, useState } from 'react';
import {
  getAllCoverLetters,
  createCoverLetter,
} from '@/services/coverLetterService';
import { verifyToken } from '@/services/authService';
import AdminLayout from '@/components/admin/AdminLayout';

const CoverLettersPage = () => {
  const [coverLetters, setCoverLetters] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [newCoverLetter, setNewCoverLetter] = useState({
    name: '',
    description: '',
    previewImage: '',
    structure: [
      { type: 'h1', text: '{{name}}' },
      { type: 'p', text: 'Dear {{company}},' },
    ],
    cssStyles: 'body { font-family: Arial; }',
  });

  useEffect(() => {
    const fetchCoverLetters = async () => {
      try {
        const data = await getAllCoverLetters();
        setCoverLetters(data);
      } catch (err: any) {
        setError(err?.response?.data?.error || 'Failed to load cover letters.');
      } finally {
        setLoading(false);
      }
    };

    fetchCoverLetters();
  }, []);

  const handleCreateCoverLetter = async () => {
    try {
      const token = localStorage.getItem('token') || '';
      const createdCoverLetter = await createCoverLetter(token, newCoverLetter);
      setCoverLetters([...coverLetters, createdCoverLetter]);
    } catch (err) {
      console.error('Error creating cover letter:', err);
    }
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold">Manage Cover Letters</h1>
      {loading && <p>Loading cover letters...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <button
        onClick={handleCreateCoverLetter}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
      >
        Create Cover Letter
      </button>

      <div className="grid grid-cols-3 gap-4 mt-6">
        {coverLetters.map((letter) => (
          <div key={letter.id} className="border p-4">
            <h2 className="text-lg font-bold">{letter.name}</h2>
            <p>{letter.description}</p>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};

export default CoverLettersPage;
