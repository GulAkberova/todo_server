const { todo } = require("../models/Todo");

const todoController = {
  getAll: (req, res) => {
    todo.find({}, function (err, docs) {
      if (!err) {
        res.json(docs);
      } else {
        res.status(500).json(err);
      }
    });
  },
  getPost: (req, res) => {
    let newTodo = new todo({
      text: req.body.text,
      isCopleted: false,
      isDeleted: false,
      date: req.body.date,
    });

    newTodo.save(function (err, doc) {
      if (!err) {
        res.json(doc);
      } else {
        res.status(500).json(err);
      }
    });
  },
  getById: (req, res) => {
    let id = req.params.id;
    todo.findById(id, (err, doc) => {
      if (!err) {
        console.log(doc);
        res.json(doc);
      } else {
        res.status(500).json(err);
      }
    });
  },
  getDelete: (req, res) => {
    let id = req.params.id;
    todo.findByIdAndDelete(id, { isDeleted: true }, (err, doc) => {
      if (!err) {
        res.json(doc);
      } else {
        res.status(500).json(err);
      }
    });
  },
  getPut: (req, res) => {
    let id = req.params.id;
    console.log(id);
    let updateTodo = new todo({
      _id: id,
      text: req.body.text,
      isDeleted: req.body.isDeleted,
      isCompleted: req.body.isCompleted,
    });
    // console.log(updateTodo);
    todo.findByIdAndUpdate(id, updateTodo, { new: true }, (err, doc) => {
      if (!err) {
        console.log(doc);
        res.json(doc);
      } else {
        res.status(500).json(err);
      }
    });
  },
};

module.exports = {
  todoController,
};
