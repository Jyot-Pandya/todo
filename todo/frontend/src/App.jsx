import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'  
import './App.css'
import { CreateTodo } from './components/CreateTodo'
import { Todos } from './components/Todos'
import { CompletedTodos } from './components/CompletedTodos'

function App() {
  const [todos, setTodos] = useState([]);

  const fetchTodos = () => {
    fetch("http://localhost:3000/todos")
      .then(async res => {
        const json = await res.json();
        setTodos(json.todos);
      })
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <Router>
      <div className="container mx-auto p-4">
        <nav className="mb-4">
          <Link className="mr-4" to="/">Incomplete Todos</Link>
          <Link to="/completed">Completed Todos</Link>
        </nav>
        <Routes>
          <Route path="/" element={
            <>
              <CreateTodo refreshTodos={fetchTodos} />
              <Todos todos={todos.filter(todo => !todo.completed)} refreshTodos={fetchTodos} />
            </>
          } />
          <Route path="/completed" element={
            <CompletedTodos todos={todos.filter(todo => todo.completed)} refreshTodos={fetchTodos} />
          } />
        </Routes>
      </div>
    </Router>
  )
}

export default App