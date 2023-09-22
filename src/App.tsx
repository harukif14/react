import React, { useState } from "react";
import "./App.css";
import { useRecoilState } from 'recoil';
import { todoListState, Todo } from './state/todoState';

type Filter = 'all' | 'checked' | 'unchecked' | 'removed';

function App() {
  const [inputText, setInputText] = useState("");
  const [filter, setFilter] = useState<Filter>('all');

  const [todos, setTodos] = useRecoilState(todoListState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputText) return;

    const currentdate = new Date();
    const newTodo: Todo = {
      inputValue: inputText,
      id: todos.length,
      checked: false,
      removed: false,
      addedDate: currentdate,
    };

    setTodos((prevTodos) => [newTodo, ...prevTodos]);
    setInputText("");
  };

  const handleEdit = (id: number, inputValue: string) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, inputValue } : todo
    );
    setTodos(newTodos);
  };

  const handleChecked = (id: number, checked: boolean) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, checked: !checked } : todo
    );
    setTodos(newTodos);
  };

  const handleRemove = (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }

  const handleRestore = (id: number) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, removed: false } : todo
    );
    setTodos(updatedTodos);
  };

  const handleFilterChange = (newFilter: Filter) => {
    setFilter(newFilter);
  }

  const filteredTodos = todos.filter((todo) => {
    switch (filter) {
      case 'all':
        return true;
      case 'checked':
        return todo.checked;
      case 'unchecked':
        return !todo.checked;
      case 'removed':
        return todo.removed;
      default:
        return true;
    }
  });

  return (
    <div className="App">
      <div>
        <h2>Todoリスト with Typescript</h2>
        <select onChange={(e) => handleFilterChange(e.target.value as Filter)}>
          <option value="all">すべてのタスク</option>
          <option value="checked">完了したタスク</option>
          <option value="unchecked">未完了のタスク</option>
          <option value="removed">ゴミ箱</option>
        </select>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            onChange={(e) => handleChange(e)}
            value={inputText}
            className="inputText"
          />
          <input type="submit" value="作成" className="submitButton" />
        </form>
        <ul className="todoList">
          {filteredTodos.map((todo) => (
            <li key={todo.id}>
              <div>
                <span>{todo.inputValue}</span>
                <span className="date">{todo.addedDate.toLocaleString()}</span>
              </div>
              <input
                type="text"
                value={todo.inputValue}
                onChange={(e) => handleEdit(todo.id, e.target.value)}
                disabled={todo.checked || todo.removed}
              />
              <input
                type="checkbox"
                checked={todo.checked}
                onChange={() => handleChecked(todo.id, todo.checked)}
              />
              {!todo.removed ? (
                <button onClick={() => handleRemove(todo.id)}>消</button>
              ) : (
                <button onClick={() => handleRestore(todo.id)}>復元</button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
