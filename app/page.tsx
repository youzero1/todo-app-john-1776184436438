'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import TodoList from '@/components/TodoList';
import TodoInput from '@/components/TodoInput';
import TodoFilter from '@/components/TodoFilter';
import { Todo, FilterType } from '@/types/index';

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');

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

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const activeTodosCount = todos.filter((t) => !t.completed).length;
  const completedTodosCount = todos.filter((t) => t.completed).length;

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 py-12 px-4">
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
            <TodoInput onAdd={addTodo} />
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

        <motion.p
          className="text-center text-gray-400 text-xs mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          {todos.length} total task{todos.length !== 1 ? 's' : ''}
        </motion.p>
      </div>
    </main>
  );
}
