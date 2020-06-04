import React from "react";

const TodoList = ({ todos, toggleComplete }) => {
  return (
    <div className="section center todoList">
      <ul className="list">
        {todos.map((todo) => {
          console.log(typeof todo.id);
          return (
            <li key={todo.id}>
              <label>
                <input
                  type="checkbox"
                  name={todo.id}
                  onClick={(e) => toggleComplete(todo.id)}
                  checked={todo.complete}
                />
                <span style={{ color: "white" }}>{todo.description}</span>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TodoList;
