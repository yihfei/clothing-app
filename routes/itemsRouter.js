const express = require("express");
const itemsRouter = express.Router();
const itemsController = require('../controllers/itemsController');

// fetch all clothing items
itemsRouter.get("/", itemsController.getAllItems);

itemsRouter.get("/:id", itemsController.getItemById);

itemsRouter.post("/", itemsController.createItem);

itemsRouter.put("/:id", itemsController.updateItem);

itemsRouter.delete("/:id", itemsController.deleteItem);

module.exports = itemsRouter;