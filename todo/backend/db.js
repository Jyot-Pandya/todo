/*
  Todo{
    title: string,
    description: string,
    completed: boolean,
    completedAt: Date
  }
*/

const mongoose = require('mongoose');

// put link in .env file 
mongoose.connect("mongodb+srv://jyotpandya1512:rDMf4uFd0DeOpB0w@cluster0.oz2jp.mongodb.net/Users")

const todoSchema = mongoose.Schema({
  title: String,
  description: String,
  completed: Boolean,
  completedAt: { type: Date, default: null } // new field
})

const todo = mongoose.model('todoapp', todoSchema);

module.exports = {
  todo: todo
}