const zod = require("zod");

/*
body - POST
{
  title: "string",
  description: "string"
}
body - PUT
{
  id: "string",
  title?: "string",
  description?: "string",
  completed?: "boolean"
}
*/

const createTodo = zod.object({
  title: zod.string(),
  description: zod.string()
})

const updateTodo = zod.object({
  id: zod.string(),
  title: zod.string().optional(),
  description: zod.string().optional(),
  completed: zod.boolean().optional()
})

module.exports = {
  createTodo: createTodo,
  updateTodo: updateTodo
}