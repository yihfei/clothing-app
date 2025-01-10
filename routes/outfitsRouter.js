// outfits are a collection of items
const express = require("express");
const outfitsRouter = express.Router();
const outfitsController = require('../controllers/outfitsController');

outfitsRouter.get("/", outfitsController.getAllOutfits);

outfitsRouter.get("/:id", outfitsController.getOutfitById);

outfitsRouter.post("/", outfitsController.createOutfit);

outfitsRouter.put("/:id", outfitsController.updateOutfit);

outfitsRouter.delete("/:id", (req, res) => {
    console.log("deleting outfit with id: ", req.params.id);
});

// add an item to an outfit
outfitsRouter.post("/:id/items", (req, res) => {
    // use req.body to get the clothing items data
    // use req.params for outfit id
    console.log("adding item to outfit with id: ", req.params.id);
});

// delete an item from an outfit
outfitsRouter.delete("/:id/items/:itemId", (req, res) => {
    // use req.params to get the outfit id and item id
    console.log("deleting item with id: ", req.params.itemId, " from outfit with id: ", req.params.id);
});

module.exports = outfitsRouter;
