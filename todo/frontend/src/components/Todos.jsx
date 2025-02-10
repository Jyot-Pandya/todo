import { useNavigate } from 'react-router-dom'  // new import
export function Todos({ todos, refreshTodos }) {
  const navigate = useNavigate();  // new hook
  return (
    <div className="p-4">
      {todos.map(todo => (
        <div className="border rounded p-4 shadow m-2 hover:shadow-lg transition-shadow duration-300" key={todo._id}>
          <h1 className={`text-xl font-bold ${todo.completed ? "line-through" : ""}`}>{todo.title}</h1>
          <h2 className={`text-lg ${todo.completed ? "line-through" : ""}`}>{todo.description}</h2>
          {todo.completed && todo.completedAt && (
            <p className="text-sm italic">
              Completed on: {new Date(todo.completedAt).toLocaleString()}
            </p>
          )}
          <div className="flex space-x-2 mt-2">
            <button
              className={`px-4 py-2 transition transform hover:scale-105 duration-300 ${todo.completed ? "bg-yellow-500" : "bg-green-500"} text-white rounded`}
              onClick={() => {
                fetch("http://localhost:3000/todo", {
                  method: "PUT",
                  body: JSON.stringify({ id: todo._id, completed: !todo.completed }),
                  headers: { "Content-type": "application/json" }
                })
                .then(async res => {
                    await res.json();
                    refreshTodos && refreshTodos();
                    // If marked as complete, navigate to completed todos page
                    if (!todo.completed) {
                      navigate('/completed')
                    }
                })
              }}>
              {todo.completed ? "Mark as Incomplete" : "Mark as Complete"}
            </button>
            <button className="px-4 py-2 bg-red-500 text-white rounded transition transform hover:scale-105 duration-300"
              onClick={() => {
                fetch(`http://localhost:3000/todo/${todo._id}`, {
                  method: "DELETE",
                })
                .then(async res => {
                    await res.json();
                    alert("Todo deleted");
                    refreshTodos && refreshTodos();
                })
              }}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}