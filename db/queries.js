const { get } = require("../routes/outfitsRouter");
const pool = require("./pool");

// Categories functions
const getAllCategories = async () => {
    const result = await pool.query('SELECT * FROM categories');
    return result.rows;
  };
  
const getCategoryById = async (id) => {
  const result = await pool.query('SELECT * FROM categories WHERE id = $1', [id]);
  return result.rows[0];
};

const createCategory = async (category) => {
  const { name, description } = category;
  const result = await pool.query(
    'INSERT INTO categories (name, description) VALUES ($1, $2) RETURNING *',
    [name, description]
  );
  return result.rows[0];
};

const updateCategory = async (id, category) => {
  const { name, description } = category;
  const result = await pool.query(
    'UPDATE categories SET name = $1, description = $2 WHERE id = $3 RETURNING *',
    [name, description, id]
  );
  return result.rows[0];
};

const deleteCategory = async (id) => {
  const result = await pool.query('DELETE FROM categories WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
};

// Clothing Items functions
const getAllItems = async () => {
  const result = await pool.query('SELECT * FROM clothing_items');
  return result.rows;
};

const getItemById = async (id) => {
  const result = await pool.query('SELECT * FROM clothing_items WHERE id = $1', [id]);
  return result.rows[0];
};

const createItem = async (item) => {
  const { name, price, favourite, brand, fit, color, material, category_id, image_url, purchase_date, notes } = item;
  const result = await pool.query(
    'INSERT INTO clothing_items (name, price, favourite, brand, fit, color, material, category_id, image_url, purchase_date, notes) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *',
    [name, price, favourite, brand, fit, color, material, category_id, image_url, purchase_date, notes]
  );
  return result.rows[0];
};

const updateItem = async (id, item) => {
  const { name, price, favourite, brand, fit, color, material, category_id, image_url, purchase_date, notes } = item;
  const result = await pool.query(
    'UPDATE clothing_items SET name = $1, price = $2, favourite = $3, brand = $4, fit = $5, color = $6, material = $7, category_id = $8, image_url = $9, purchase_date = $10, notes = $11 WHERE id = $12 RETURNING *',
    [name, price, favourite, brand, fit, color, material, category_id, image_url, purchase_date, notes, id]
  );

  return result.rows[0];
};

const deleteItem = async (id) => {
  const result = await pool.query('DELETE FROM clothing_items WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
};

// Outfits functions
const getAllOutfits = async () => {
  const result = await pool.query('SELECT * FROM outfits');
  return result.rows;
};

const getOutfitById = async (id) => {
  const result = await pool.query('SELECT * FROM outfits WHERE id = $1', [id]);
  return result.rows[0];
};

const createOutfit = async (outfit) => {
  const { name, description } = outfit;
  const result = await pool.query(
    'INSERT INTO outfits (name, description) VALUES ($1, $2) RETURNING *',
    [name, description]
  );
  return result.rows[0];
};

const updateOutfit = async (id, outfit) => {
  const { name, description } = outfit;
  const result = await pool.query(
    'UPDATE outfits SET name = $1, description = $2 WHERE id = $3 RETURNING *',
    [name, description, id]
  );
  return result.rows[0];
};

const deleteOutfit = async (id) => {
  const result = await pool.query('DELETE FROM outfits WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
};

const addItemToOutfit = async (outfitId, clothingItemId) => {
  const result = await pool.query(
    'INSERT INTO outfit_items (outfit_id, clothing_item_id) VALUES ($1, $2) RETURNING *',
    [outfitId, clothingItemId]
  );
  return result.rows[0];
};

const deleteItemFromOutfit = async (outfitId, clothingItemId) => {
  const result = await pool.query(
    'DELETE FROM outfit_items WHERE outfit_id = $1 AND clothing_item_id = $2 RETURNING *',
    [outfitId, clothingItemId]
  );
  return result.rows[0];
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
  getAllOutfits,
  getOutfitById,
  createOutfit,
  updateOutfit,
  deleteOutfit,
  addItemToOutfit,
  deleteItemFromOutfit
};