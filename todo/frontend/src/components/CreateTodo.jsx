import { useState } from "react";

export function CreateTodo({ refreshTodos }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    return (
      <div className="flex flex-col items-center">
        <input id="title" 
               className="p-2 m-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
               type="text" 
               placeholder="title" 
               onChange={e => setTitle(e.target.value)} />
        <br />
        <input id="desc" 
               className="p-2 m-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
               type="text" 
               placeholder="description" 
               onChange={e => setDescription(e.target.value)} />
        <br />
        <button className="px-4 py-2 bg-blue-500 text-white rounded m-2 transition transform hover:scale-105 duration-300" 
                onClick={() => {
                  fetch("http://localhost:3000/todo", {
                    method: "POST",
                    body: JSON.stringify({
                        title: title,
                        description: description
                    }),
                    headers: {
                        "Content-type": "application/json"
                    }
                  })
                  .then(async res => {
                      await res.json();
                      alert("Todo added");
                      refreshTodos && refreshTodos();
                  })
                }}>
          Add a todo
        </button>
      </div>
    )
}
