import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import {
  addTodo,
  deleteTodo,
  fetchTodos,
  updateTodo,
} from '../redux/todoSlice';

const TodoBox = () => {
  const todos = useSelector((state) => state.todo);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');

  useEffect(() => {
    dispatch(fetchTodos()).then(() => setLoading(false));
  }, [dispatch]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    dispatch(addTodo(title));
    e.target.reset();
  };

  const handleToggle = (todo) => {
    dispatch(
      updateTodo({ id: todo.id, updates: { completed: !todo.completed } })
    );
  };

  const handleEdit = () => {
    if (!editingText.trim()) return;
    dispatch(updateTodo({ id: editingId, updates: { title: editingText } }));
    setEditingId(null);
    setEditingText('');
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg text-center">
        Loading todos...
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
      {/* Header */}
      <h1 className="text-2xl font-bold text-center mb-6 text-blue-700">
        My Todo List
      </h1>

      {/* Input */}
      <form
        className="flex gap-3 items-center border border-gray-300 rounded-lg px-4 py-3 mb-6"
        onSubmit={handleAdd}
      >
        <input
          type="text"
          placeholder="What need to be done?"
          className="flex-1 outline-none text-sm placeholder-gray-400"
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          type="submit"
        >
          Add
        </button>
      </form>

      {/* Todo List */}
      <ul className="space-y-4">
        {todos?.length === 0 ? (
          <p className="text-gray-400 text-center">No tasks found.</p>
        ) : (
          todos.map((todo) => (
            <li
              key={todo.id}
              className="flex justify-between items-center bg-gray-100 px-4 py-3 rounded-lg shadow-sm"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggle(todo)}
                  className="w-4 h-4 accent-blue-600 cursor-pointer"
                />

                {editingId === todo.id ? (
                  <input
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    className="border border-gray-300 p-1 rounded text-sm"
                  />
                ) : (
                  <span
                    className={`text-sm ${
                      todo.completed
                        ? 'line-through text-gray-400'
                        : 'text-gray-800'
                    }`}
                  >
                    {todo.title}
                  </span>
                )}
              </div>

              <div className="flex gap-2">
                {editingId === todo.id ? (
                  <>
                    <button
                      onClick={handleEdit}
                      className="text-green-600 text-sm hover:underline"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setEditingId(null);
                        setEditingText('');
                      }}
                      className="text-gray-500 text-sm hover:underline"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="text-blue-600 text-sm hover:underline"
                      onClick={() => {
                        setEditingId(todo.id);
                        setEditingText(todo.title);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-500 text-sm hover:underline"
                      onClick={() => handleDelete(todo.id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default TodoBox;
