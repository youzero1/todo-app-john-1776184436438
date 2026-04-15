'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import TodoList from '@/components/TodoList';
import TodoInput from '@/components/TodoInput';
import TodoFilter from '@/components/TodoFilter';
import KeyboardShortcutsModal from '@/components/KeyboardShortcutsModal';
import { Todo, FilterType } from '@/types/index';

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const addTodo = (text: string) => {
    if (text.trim() === '') return;
    const newTodo: Todo = {
      id: Date.now().toString(),
      text: text.trim(),
      completed: false,
      createdAt: new Date(),
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const editTodo = (id: string, newText: string) => {
    if (newText.trim() === '') return;
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, text: newText.trim() } : todo
      )
    );
  };

  const clearCompleted = useCallback(() => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  }, []);

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const activeTodosCount = todos.filter((t) => !t.completed).length;
  const completedTodosCount = todos.filter((t) => t.completed).length;

  // Global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      const isTyping = tag === 'input' || tag === 'textarea';

      // Always-active shortcuts
      if (e.key === '?' && !isTyping) {
        e.preventDefault();
        setShortcutsOpen((prev) => !prev);
        return;
      }

      if (e.key === 'Escape') {
        if (shortcutsOpen) {
          setShortcutsOpen(false);
        }
        return;
      }

      // Shortcuts that should not fire while typing in an input
      if (isTyping) return;

      if (e.key === 'n' || e.key === 'N') {
        e.preventDefault();
        inputRef.current?.focus();
        return;
      }

      if (e.key === '1') {
        e.preventDefault();
        setFilter('all');
        return;
      }

      if (e.key === '2') {
        e.preventDefault();
        setFilter('active');
        return;
      }

      if (e.key === '3') {
        e.preventDefault();
        setFilter('completed');
        return;
      }

      if (e.key === 'x' || e.key === 'X') {
        e.preventDefault();
        clearCompleted();
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcutsOpen, clearCompleted]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 py-12 px-4">
      <KeyboardShortcutsModal
        isOpen={shortcutsOpen}
        onClose={() => setShortcutsOpen(false)}
      />

      <div className="max-w-lg mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        >
          <h1 className="text-5xl font-bold text-orange-500 mb-2 tracking-tight">Todo</h1>
          <p className="text-gray-500 text-sm">Stay organized, get things done</p>
        </motion.div>

        {/* Main Card */}
        <motion.div
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
          initial={{ opacity: 0, y: 32, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.08, ease: [0.23, 1, 0.32, 1] }}
        >
          {/* Input */}
          <div className="p-6 border-b border-gray-100">
            <TodoInput onAdd={addTodo} inputRef={inputRef} />
          </div>

          {/* Stats */}
          <AnimatePresence>
            {todos.length > 0 && (
              <motion.div
                key="stats"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                className="px-6 py-3 bg-gray-50 border-b border-gray-100 flex items-center justify-between text-xs text-gray-500 overflow-hidden"
              >
                <span>
                  <span className="font-semibold text-orange-500">{activeTodosCount}</span> task{activeTodosCount !== 1 ? 's' : ''} remaining
                </span>
                <AnimatePresence>
                  {completedTodosCount > 0 && (
                    <motion.button
                      key="clear"
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 12 }}
                      transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                      onClick={clearCompleted}
                      className="text-red-400 hover:text-red-600 transition-colors font-medium"
                    >
                      Clear completed ({completedTodosCount})
                    </motion.button>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Filter */}
          <AnimatePresence>
            {todos.length > 0 && (
              <motion.div
                key="filter"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                className="px-6 py-3 border-b border-gray-100 overflow-hidden"
              >
                <TodoFilter currentFilter={filter} onFilterChange={setFilter} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Todo List */}
          <div className="divide-y divide-gray-50">
            <TodoList
              todos={filteredTodos}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onEdit={editTodo}
            />
          </div>

          {/* Empty state */}
          <AnimatePresence mode="wait">
            {todos.length === 0 && (
              <motion.div
                key="empty-main"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                className="py-16 text-center"
              >
                <p className="text-gray-400 font-medium">No todos yet</p>
                <p className="text-gray-300 text-sm mt-1">Add a task above to get started</p>
              </motion.div>
            )}

            {filteredTodos.length === 0 && todos.length > 0 && (
              <motion.div
                key="empty-filter"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                className="py-12 text-center"
              >
                <p className="text-gray-400 font-medium">No {filter} tasks</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Footer */}
        <motion.div
          className="flex items-center justify-between mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <p className="text-gray-400 text-xs">
            {todos.length} total task{todos.length !== 1 ? 's' : ''}
          </p>
          <motion.button
            onClick={() => setShortcutsOpen(true)}
            className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-orange-500 transition-colors px-2.5 py-1.5 rounded-lg hover:bg-orange-50"
            whileTap={{ scale: 0.92 }}
            whileHover={{ scale: 1.04 }}
            transition={{ type: 'spring', stiffness: 400, damping: 22 }}
          >
            <kbd className="inline-flex items-center justify-center w-5 h-5 bg-white border border-gray-200 text-gray-500 text-xs font-semibold rounded font-mono shadow-sm">?</kbd>
            <span>Shortcuts</span>
          </motion.button>
        </motion.div>
      </div>
    </main>
  );
}
