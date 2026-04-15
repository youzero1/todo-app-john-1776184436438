'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface TodoInputProps {
  onAdd: (text: string) => void;
}

export default function TodoInput({ onAdd }: TodoInputProps) {
  const [value, setValue] = useState('');
  const [focused, setFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value.trim()) {
      onAdd(value);
      setValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <motion.div
        className="flex-1 relative"
        animate={focused ? { scale: 1.01 } : { scale: 1 }}
        transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
      >
        <input
          type="text"
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="What needs to be done?"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent text-gray-700 placeholder-gray-300 transition-all"
          autoFocus
        />
      </motion.div>
      <motion.button
        type="submit"
        disabled={!value.trim()}
        className="px-5 py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-200 text-white rounded-xl font-semibold flex items-center gap-2 relative overflow-hidden"
        whileTap={value.trim() ? { scale: 0.93 } : {}}
        whileHover={value.trim() ? { scale: 1.04 } : {}}
        transition={{ type: 'spring', stiffness: 400, damping: 22 }}
      >
        <motion.span
          className="text-lg leading-none"
          animate={value.trim() ? { rotate: 0 } : { rotate: 0 }}
        >
          +
        </motion.span>
        <span>Add</span>
      </motion.button>
    </form>
  );
}
