#! /usr/bin/env node

const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) NOT NULL,
  description TEXT
);

CREATE TABLE IF NOT EXISTS clothing_items (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2),
  favourite BOOLEAN DEFAULT FALSE,
  brand VARCHAR(100),
  fit VARCHAR(50),
  color VARCHAR(50),
  material VARCHAR(100),
  category_id INT,
  image_url TEXT,
  purchase_date DATE,
  notes TEXT,
  FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS outfits (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS outfit_items (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  outfit_id INT NOT NULL,
  clothing_item_id INT NOT NULL,
  FOREIGN KEY (outfit_id) REFERENCES outfits (id) ON DELETE CASCADE,
  FOREIGN KEY (clothing_item_id) REFERENCES clothing_items (id) ON DELETE CASCADE
);

-- Insert Sample Data into Categories
INSERT INTO categories (name, description) VALUES
  ('Tops', 'Clothing for the upper body'),
  ('Bottoms', 'Clothing for the lower body'),
  ('Shoes', 'Footwear of all types')
ON CONFLICT DO NOTHING;

-- Insert Sample Data into Clothing Items
INSERT INTO clothing_items (name, price, favourite, brand, fit, color, material, category_id, purchase_date, image_url, notes) VALUES
  ('Blue T-Shirt', 25.99, TRUE, 'Uniqlo', 'Regular Fit', 'Blue', 'Cotton', 1, '2025-01-01', 'https://example.com/tshirt.jpg', 'Comfortable and versatile.'),
  ('Black Jeans', 49.99, FALSE, 'Levis', 'Slim Fit', 'Black', 'Denim', 2, '2024-12-01', 'https://example.com/jeans.jpg', 'Classic style.'),
  ('White Sneakers', 75.00, TRUE, 'Adidas', 'Regular', 'White', 'Leather', 3, '2024-11-20', 'https://example.com/sneakers.jpg', 'Stylish and durable.')
ON CONFLICT DO NOTHING;

-- Insert Sample Data into Outfits
INSERT INTO outfits (name, description) VALUES
  ('Casual Friday Look', 'Perfect for casual Fridays at work.'),
  ('Weekend Adventure', 'Comfortable and durable for outdoor adventures.')
ON CONFLICT DO NOTHING;

-- Insert Sample Data into Outfit Items
INSERT INTO outfit_items (outfit_id, clothing_item_id) VALUES
  (1, 1),  -- Blue T-Shirt in Casual Friday Look
  (1, 2),  -- Black Jeans in Casual Friday Look
  (2, 3)   -- White Sneakers in Weekend Adventure
ON CONFLICT DO NOTHING;
`;

async function main() {
  console.log("Seeding database...");
  const client = new Client({
    connectionString: "postgresql://yihfei:yihfei@localhost:5432/clothing_app", // Update database name if needed
  });

  try {
    await client.connect();
    await client.query(SQL);
    console.log("Database seeded successfully!");
  } catch (err) {
    console.error("Error seeding database:", err);
  } finally {
    await client.end();
  }
}

main();
