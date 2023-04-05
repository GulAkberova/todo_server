const express = require("express");
var cors = require("cors");
const { urlencoded } = require("express");
const { default: mongoose } = require("mongoose");
require("dotenv").config();
const todoRouter = require("./routes/TodoRouter");

const app = express();

app.use(cors());
app.use(express.json());
app.use(urlencoded());

const PORT = process.env.POST || 3000;
// app.use(function (req, res, next) {
//   if (false) {
//     res.status(401).json("Access error");
//   } else {
//     next();
//   }
// });

mongoose.set("strictQuery", false);

const mongoDbUser = process.env.mongoDbUser;
const mongoDbPassword = process.env.mongoDbPassword;

mongoose
  .connect(
    `mongodb+srv://${mongoDbUser}:${mongoDbPassword}@cluster0.oxil0us.mongodb.net/TodoApp`
  )
  .then((res) => {
    console.log("Connect");
  })
  .catch((err) => {
    console.log("err", err);
  });

app.use("/api/todo", todoRouter);

app.listen(PORT);
