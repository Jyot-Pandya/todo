const express = require("express");
const { createTodo, updateTodo } = require("./types");
const { todo } = require("./db");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

app.post("/todo", async function(req, res) {
    const createPayload = req.body;
    const parsedPayload = createTodo.safeParse(createPayload);

    if (!parsedPayload.success) {
        res.status(411).json({
            msg: "You sent the wrong inputs",
        })
        return;
    }
    //  mongodb
    await todo.create({
        title: createPayload.title,
        description: createPayload.description,
        completed: false,
        completedAt: null // new field
    })

    res.json({
        msg: "Todo created"
    })
})

app.get("/todos", async function(req, res) {
    const todos = await todo.find({});

    res.json({
        todos
    })
})

app.put("/todo", async function(req, res) {
    const updatePayload = req.body;
    const parsedPayload = updateTodo.safeParse(updatePayload);
    if (!parsedPayload.success) {
        res.status(411).json({ msg: "You sent the wrong inputs" })
        return;
    }
    const updateData = {};
    if (updatePayload.title) updateData.title = updatePayload.title;
    if (updatePayload.description) updateData.description = updatePayload.description;
    if (updatePayload.completed !== undefined) {
      updateData.completed = updatePayload.completed;
      updateData.completedAt = updatePayload.completed ? new Date() : null; // new logic
    }
    
    await todo.updateOne({ _id: updatePayload.id }, { $set: updateData });
    res.json({ msg: "Todo updated" });
})

app.delete("/todo/:id", async function(req, res) {
    const { id } = req.params;
    await todo.deleteOne({ _id: id });

    res.json({
        msg: "Todo deleted"
    })
})

app.listen(3000);