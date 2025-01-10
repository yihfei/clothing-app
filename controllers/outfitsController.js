const db = require('../db/queries');

exports.getAllOutfits = async (req, res) => {
    try {
        const outfits = await db.getAllOutfits();
        res.json(outfits);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
}

exports.getOutfitById = async (req, res) => {
    try {
        const item = await db.getOutfitById(req.params.id);
        if (!item) {
            return res.status(404).json({ msg: 'Item not found' });
        }
        res.json(item)
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
}

exports.createOutfit = async (req, res) => {
    try {
        const outfit = req.body;
        if (!outfit.name || !outfit.description) {
            return res.status(400).json({ error: "Missing required fields: name" });
        }
        const newOutfit = await db.createOutfit(outfit);
        res.status(201).json(newOutfit);
    } catch (err) {
        console.error("Error creating outfit:", err);
        res.status(500).json({ error: "Failed to create outfit" });
    }
}

exports.updateOutfit = async (req, res) => {
    try {
        const outfit = req.body;
        if (!outfit.name || !outfit.description) {
            return res.status(400).json({ error: "Missing required parameters" });
        }
        const updatedOutfit = await db.updateOutfit(req.params.id, outfit);
        res.json(updatedOutfit);
    } catch (err) {
        console.error("Error updating outfit:", err);
        res.status(500).json({ error: "Failed to update outfit" });
    }
}

exports.deleteOutfit = async (req, res) => {
    try {
        const deletedOutfit = await db.deleteOutfit(req.params.id);
        res.json(deletedOutfit);
    } catch (err) {
        console.error("Error deleting outfit:", err);
        res.status(500).json({ error: "Failed to delete outfit" });
    }
}

exports.addItemToOutfit = async (req, res) => {
    try {
        const { outfitId, clothingItemId } = req.params;
        const outfitItem = await db.addItemToOutfit(outfitId, clothingItemId);
        res.json(outfitItem);
    } catch (err) {
        console.error("Error adding item to outfit:", err);
        res.status(500).json({ error: "Failed to add item to outfit" });
    }
}

exports.deleteItemFromOutfit = async (req, res) => {
    try {
        const { outfitId, clothingItemId } = req.params;
        const deletedItem = await db.deleteItemFromOutfit(outfitId, clothingItemId);
        res.json(deletedItem);
    } catch (err) {
        console.error("Error deleting item from outfit:", err);
        res.status(500).json({ error: "Failed to delete item from outfit" });
    }
}
