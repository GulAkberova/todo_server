const { Schema, default: mongoose } = require("mongoose");

const todoSchema = Schema({
  text: String,
  isDeleted: { type: Boolean, default: false },
  isCompleted: Boolean,
  date: { type: Date, default: Date.now() },
});

const todo = mongoose.model("todo", todoSchema);

// const newTodo=new todo({
//     text:'gsdchdfjv'

// })
// newTodo.save()

module.exports = {
  todo,
};
