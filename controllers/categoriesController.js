const db = require('../db/queries');

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await db.getAllCategories();
        res.json(categories);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
}

exports.getCategoryById = async (req, res) => {
    try {
        const category = await db.getCategoryById(req.params.id);
        if (!category) {
            return res.status(404).json({ msg: 'Category not found' });
        }
        res.json(category);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
}

exports.createCategory = async (req, res) => {
    try {
        const category = req.body;
        if (!category.name || !category.description) {
            return res.status(400).json({ error: "Missing required fields: name, description" });
        }
        const newCategory = await db.createCategory(category);
        res.status(201).json(newCategory);
    } catch (err) {
        console.error("Error creating category:", err);
        res.status(500).json({ error: "Failed to create category" });
    }
}

exports.updateCategory = async (req, res) => {
    try {
        const category = req.body;
        // Check if required parameters are missing
        if (!category.name || !category.description) {
            return res.status(400).json({ error: "Missing required parameters" });
        }
        const updatedCategory = await db.updateCategory(req.params.id, category);
        res.json(updatedCategory);
    } catch (err) {
        console.error("Error updating category:", err);
        res.status(500).json({ error: "Failed to update category" });
    }
}

exports.deleteCategory = async (req, res) => {
    try {
        const category = await db.deleteCategory(req.params.id);
        if (!item) {
            return res.status(404).json({ msg: 'Category not found' });
        }
        res.json({ msg: 'Item deleted' });
    } catch (err) {
        console.error("Error deleting item:", err);
        res.status(500).json({ error: "Failed to delete item" });
    }
}