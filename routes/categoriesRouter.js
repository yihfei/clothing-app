const express = require('express');
const categoriesRouter = express.Router();
const categoriesController = require('../controllers/categoriesController');

categoriesRouter.get('/', categoriesController.getAllCategories);

categoriesRouter.get('/:id', categoriesController.getCategoryById);

categoriesRouter.post('/', categoriesController.createCategory);

categoriesRouter.put('/:id', categoriesController.updateCategory);

categoriesRouter.delete('/:id', categoriesController.deleteCategory);

