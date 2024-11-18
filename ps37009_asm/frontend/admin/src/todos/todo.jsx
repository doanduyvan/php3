import React, { useState } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([
    'Hoc JS',
    'Hoc CSS',
    'Hoc HTML',
    'Hoc React'
  ]);
  const [newTodo, setNewTodo] = useState('');

  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, newTodo]);
      setNewTodo('');
    }
  };

  const handleDeleteTodo = (index) => {
    const updatedTodos = todos.filter((_, idx) => idx !== index);
    setTodos(updatedTodos);
  };

  const handleEditTodo = (index) => {
    const updatedTodo = prompt('Edit todo:', todos[index]);
    if (updatedTodo) {
      const updatedTodos = [...todos];
      updatedTodos[index] = updatedTodo;
      setTodos(updatedTodos);
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <div className="w-full max-w-lg p-4 bg-white rounded-md shadow-md">
        <h2 className="text-xl font-bold mb-4">Todo Management</h2>
        <div className="flex mb-4">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            className="flex-grow border rounded-md px-2 py-1 mr-2"
            placeholder="Enter new todo"
          />
          <button
            onClick={handleAddTodo}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Submit
          </button>
        </div>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left pb-2">Title</th>
              <th className="text-left pb-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo, index) => (
              <tr key={index} className="border-t">
                <td className="py-2">{todo}</td>
                <td className="py-2">
                  <button
                    onClick={() => handleDeleteTodo(index)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md mr-2"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleEditTodo(index)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-md"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TodoList;