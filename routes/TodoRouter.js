const express = require("express");
const { todoController } = require("../controller/TodoController");

const router = express.Router();

router.get("/", todoController.getAll);
router.post("/", todoController.getPost);
router.get("/:id", todoController.getById);
router.delete("/:id", todoController.getDelete);
router.put("/:id", todoController.getPut);

module.exports = router;
