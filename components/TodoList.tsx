'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Todo } from '@/types/index';
import TodoItem from '@/components/TodoItem';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
}

export default function TodoList({ todos, onToggle, onDelete, onEdit }: TodoListProps) {
  return (
    <ul>
      <AnimatePresence initial={false}>
        {todos.map((todo, index) => (
          <motion.li
            key={todo.id}
            initial={{ opacity: 0, y: -18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 40, scale: 0.96, transition: { duration: 0.28, ease: [0.23, 1, 0.32, 1] } }}
            transition={{
              duration: 0.38,
              ease: [0.23, 1, 0.32, 1],
              delay: index === 0 ? 0 : 0,
            }}
            layout
            layoutId={todo.id}
          >
            <TodoItem
              todo={todo}
              onToggle={onToggle}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}
