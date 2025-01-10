const db = require('../db/queries');

exports.getAllItems = async (req, res) => {
    try {
        const items = await db.getAllItems();
        res.json(items);
        console.log(items);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
}

exports.getItemById = async (req, res) => {
    try {
        const item = await db.getItemById(req.params.id);
        if (!item) {
            return res.status(404).json({ msg: 'Item not found' });
        }
        res.json(item);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
}

exports.createItem = async (req, res) => {
    try {
        const item = req.body;
        if (!item.name || !item.price || !item.category_id) {
            return res.status(400).json({ error: "Missing required fields: name, price, category_id" });
        }
        const newItem = await db.createItem(item);
        res.status(201).json(newItem);
    } catch (err) {
        console.error("Error creating item:", err);
        res.status(500).json({ error: "Failed to create item" });
    }
};

exports.updateItem = async (req, res) => {
    try {
        const item = req.body;

        if (!item.name || !item.price || !item.brand || !item.fit || !item.color || !item.material || !item.category_id) {
            return res.status(400).json({ error: "Missing required parameters" });
        }
        const updatedItem = await db.updateItem(req.params.id, item);
        res.json(updatedItem);
    } catch (err) {
        console.error("Error updating item:", err);
        res.status(500).json({ error: "Failed to update item" });
    }
};

exports.deleteItem = async (req, res) => {
    try {
        const item = await db.deleteItem(req.params.id);
        if (!item) {
            return res.status(404).json({ msg: 'Item not found' });
        }
        res.json({ msg: 'Item deleted' });
    } catch (err) {
        console.error("Error deleting item:", err);
        res.status(500).json({ error: "Failed to delete item" });
    }
}



