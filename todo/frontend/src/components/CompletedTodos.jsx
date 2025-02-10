import { useNavigate } from 'react-router-dom'  // new import

export function CompletedTodos({ todos, refreshTodos }) {
  const navigate = useNavigate();  // new hook
  const completed = todos.filter(todo => todo.completed);
  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Completed Todos</h2>
      {completed.length === 0 && <p>No completed todos.</p>}
      {completed.map(todo => (
        <div className="border rounded p-4 shadow m-2 hover:shadow-lg transition-shadow duration-300" key={todo._id}>
          <h1 className="text-xl font-bold line-through">{todo.title}</h1>
          <h2 className="text-lg line-through">{todo.description}</h2>
          {todo.completedAt && (
            <p className="text-sm italic">
              Completed on: {new Date(todo.completedAt).toLocaleString()}
            </p>
          )}
          <button
            className="px-4 py-2 bg-yellow-500 text-white rounded transition transform hover:scale-105 duration-300"
            onClick={() => {
              fetch("http://localhost:3000/todo", {
                method: "PUT",
                body: JSON.stringify({ id: todo._id, completed: false }),
                headers: { "Content-type": "application/json" }
              })
              .then(async res => {
                  await res.json();
                  alert("Todo marked as incomplete");
                  refreshTodos && refreshTodos();
                  // If marked as incomplete, navigate back to the incomplete todos page
                  navigate('/');
              })
            }}>
            Mark as Incomplete
          </button>
        </div>
      ))}
    </div>
  )
}
