'use client';

import { motion } from 'framer-motion';
import { FilterType } from '@/types/index';

interface TodoFilterProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const filters: { label: string; value: FilterType }[] = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Completed', value: 'completed' },
];

export default function TodoFilter({ currentFilter, onFilterChange }: TodoFilterProps) {
  return (
    <div className="flex gap-1">
      {filters.map((f) => (
        <motion.button
          key={f.value}
          onClick={() => onFilterChange(f.value)}
          className={`relative px-4 py-1.5 rounded-lg text-sm font-medium transition-colors duration-150 ${
            currentFilter === f.value
              ? 'text-orange-600'
              : 'text-gray-400 hover:text-gray-600'
          }`}
          whileTap={{ scale: 0.93 }}
          transition={{ type: 'spring', stiffness: 400, damping: 22 }}
        >
          {currentFilter === f.value && (
            <motion.span
              layoutId="filter-pill"
              className="absolute inset-0 bg-orange-100 rounded-lg"
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            />
          )}
          <span className="relative z-10">{f.label}</span>
        </motion.button>
      ))}
    </div>
  );
}
