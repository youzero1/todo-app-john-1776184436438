'use client';

import { useState } from 'react';

interface TodoInputProps {
  onAdd: (text: string) => void;
}

export default function TodoInput({ onAdd }: TodoInputProps) {
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value.trim()) {
      onAdd(value);
      setValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <input
        type="text"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
        placeholder="What needs to be done?"
        className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent text-gray-700 placeholder-gray-300 transition-all"
        autoFocus
      />
      <button
        type="submit"
        disabled={!value.trim()}
        className="px-5 py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-200 text-white rounded-xl font-semibold transition-colors duration-200 flex items-center gap-2"
      >
        <span className="text-lg leading-none">+</span>
        <span>Add</span>
      </button>
    </form>
  );
}
