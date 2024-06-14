import { nanoid } from "nanoid";
import { useState, useTransition } from "react";
import "./App.css";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

function App() {
  const [todoItems, setTodoItems] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  const [view, setView] = useState<"all" | "active" | "completed">("all");
  const [mode, setMode] = useState<"dark" | "light">("light");

  const addNewToDo = (text: string) => {
    setInput("");
    if (text.length === 0) {
      return false;
    }
    const newTodo: Todo = {
      id: nanoid(),
      text,
      completed: false,
    };

    console.log("newTodo", newTodo);

    setTodoItems((prev) => [...prev, newTodo]);
  };

  const deleteTodos = (id: string) => {
    const newTodoItems = todoItems.filter((todo) => todo.id !== id);
    setTodoItems(newTodoItems);
  };

  const markAsCompleted = (id: string, completed: boolean) => {
    console.log(completed);
    const updatedTodoItems = todoItems.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      } else {
        return todo;
      }
    });
    setTodoItems(updatedTodoItems);
  };

  const clearCompleted = () => {
    const completedItems = todoItems.filter((todo) => todo.completed === false);
    setTodoItems(completedItems);
    setView("all");
  };

  const active = todoItems.filter((todo) => todo.completed === false);
  const completedItems = todoItems.filter((todo) => todo.completed === true);

  return (
    <div className={`container ${mode === "dark" ? "dark-mode" : ""}`}>
      <header className="header-container"></header>
      <div className="the-entire-ui">
        <div className="header-items">
          <h1>T O D O</h1>
          <button
            type="button"
            onClick={() =>
              setMode((prev) => (prev === "light" ? "dark" : "light"))
            }
          >
            <img
              src={mode === "dark" ? "icon-sun.svg" : "icon-moon.svg"}
              alt="Moon"
            />
          </button>
        </div>
        <div className="todolist">
          <div className="create-todo-box">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.currentTarget.value)}
              placeholder="Create a new todo..."
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === "Enter")
                  addNewToDo(
                    e.currentTarget.value.charAt(0).toUpperCase() +
                      input.slice(1)
                  );
              }}
            />
          </div>
          <div className="todo-container">
            <div className="input-fields-container">
              {todoItems
                .filter((todo) => {
                  if (view === "completed") {
                    return todo.completed === true;
                  } else if (view === "active") {
                    return todo.completed === false;
                  } else {
                    return todo;
                  }
                })
                .map((todo) => (
                  <div key={todo.id} className="todo-field">
                    <div className="checkbox-container">
                      {/* Add a function on the checkbox that marks the item as completed */}

                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={(event) =>
                          markAsCompleted(todo.id, event.currentTarget.checked)
                        }
                      />
                    </div>
                    <p
                      className={`"todolist-text" ${todo.completed ? "completedText" : ""}`}
                    >
                      {todo.text}
                    </p>
                    <button onClick={() => deleteTodos(todo.id)}>X</button>
                  </div>
                ))}

              <div className="todo-field">
                <p>
                  {active.length} Items left, {completedItems.length} Items
                  completed
                </p>
                <button onClick={clearCompleted}>Clear Completed</button>
              </div>
            </div>
            <div className="status-buttons todo-field">
              <button onClick={() => setView("all")}>All</button>
              <button onClick={() => setView("active")}>Active</button>
              <button onClick={() => setView("completed")}>Completed</button>
            </div>
            <p className="error-message" hidden>
              Please Enter Something
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
