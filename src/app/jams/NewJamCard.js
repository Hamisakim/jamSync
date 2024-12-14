'use client'; // Add this directive

import { useState } from 'react';

export default function NewJamCard({ onCreate }) {
  const [formData, setFormData] = useState({
    title: '',
    genre: '',
    key: '',
    bpm: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onCreate(formData); // Call the client-side handler
      alert('New Jam created successfully!');
      setFormData({ title: '', genre: '', key: '', bpm: '' }); // Reset form
    } catch (error) {
      console.error('Error creating Jam:', error);
    }
  };

  return (
    <div className="w-full border p-4 rounded shadow-sm">
      <h2 className="text-lg font-bold mb-2">Create New Jam</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label className="block font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-2">
          <label className="block font-medium">Genre</label>
          <input
            type="text"
            name="genre"
            value={formData.genre}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-2">
          <label className="block font-medium">Key</label>
          <input
            type="text"
            name="key"
            value={formData.key}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-2">
          <label className="block font-medium">BPM</label>
          <input
            type="number"
            name="bpm"
            value={formData.bpm}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create Jam
        </button>
      </form>
    </div>
  );
}
