import React, { useState, useEffect } from "react";

type Todo = {
  id: number;
  task: string;
  completed: boolean;
};

const generateId = () => Date.now() + Math.floor(Math.random() * 1000);

const SmartTodo: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState<string>("");
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const addTodo = () => {
    if (!input.trim()) return;

    const newTodo: Todo = {
      id: generateId(),
      task: input.trim(),
      completed: false,
    };

    setTodos([newTodo, ...todos]);
    setInput("");
  };

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const removeTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  // Mock AI suggestion
  const getSmartSuggestion = () => {
    setLoading(true);
    setTimeout(() => {
      const mockSuggestions = [
        "Review TypeScript types",
        "Refactor old components",
        "Learn Zustand for state management",
        "Write unit tests for backend",
      ];
      const random = mockSuggestions[Math.floor(Math.random() * mockSuggestions.length)];
      setSuggestion(random);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    getSmartSuggestion();
  }, []);

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white shadow-2xl rounded-xl space-y-6">
      <h1 className="text-3xl font-bold text-center">🧠 Smart Todo List</h1>

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          placeholder="Add a new task..."
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow px-4 py-2 border border-gray-300 rounded"
        />
        <button
          onClick={addTodo}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Add
        </button>
      </div>

      <div className="text-sm text-gray-600">
        💡 Smart Suggestion:{" "}
        {loading ? (
          <span className="italic text-gray-400">Loading...</span>
        ) : (
          <span className="italic">{suggestion}</span>
        )}
      </div>

      <ul className="space-y-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex justify-between items-center px-4 py-2 bg-gray-100 rounded"
          >
            <span
              onClick={() => toggleTodo(todo.id)}
              className={`flex-1 cursor-pointer ${
                todo.completed ? "line-through text-gray-400" : ""
              }`}
            >
              {todo.task}
            </span>
            <button
              onClick={() => removeTodo(todo.id)}
              className="text-red-500 hover:text-red-700 transition ml-4"
            >
              ✖
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SmartTodo;