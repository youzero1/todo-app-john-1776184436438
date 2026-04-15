'use client';

import { useState } from 'react';
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
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-orange-500 mb-2 tracking-tight">Todo</h1>
          <p className="text-gray-500 text-sm">Stay organized, get things done</p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Input */}
          <div className="p-6 border-b border-gray-100">
            <TodoInput onAdd={addTodo} />
          </div>

          {/* Stats */}
          {todos.length > 0 && (
            <div className="px-6 py-3 bg-gray-50 border-b border-gray-100 flex items-center justify-between text-xs text-gray-500">
              <span>
                <span className="font-semibold text-orange-500">{activeTodosCount}</span> task{activeTodosCount !== 1 ? 's' : ''} remaining
              </span>
              {completedTodosCount > 0 && (
                <button
                  onClick={clearCompleted}
                  className="text-red-400 hover:text-red-600 transition-colors font-medium"
                >
                  Clear completed ({completedTodosCount})
                </button>
              )}
            </div>
          )}

          {/* Filter */}
          {todos.length > 0 && (
            <div className="px-6 py-3 border-b border-gray-100">
              <TodoFilter currentFilter={filter} onFilterChange={setFilter} />
            </div>
          )}

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
          {todos.length === 0 && (
            <div className="py-16 text-center">
              <div className="text-6xl mb-4">✅</div>
              <p className="text-gray-400 font-medium">No todos yet!</p>
              <p className="text-gray-300 text-sm mt-1">Add a task above to get started</p>
            </div>
          )}

          {filteredTodos.length === 0 && todos.length > 0 && (
            <div className="py-12 text-center">
              <p className="text-gray-400 font-medium">No {filter} tasks</p>
            </div>
          )}
        </div>

        <p className="text-center text-gray-400 text-xs mt-6">
          {todos.length} total task{todos.length !== 1 ? 's' : ''}
        </p>
      </div>
    </main>
  );
}
