import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const db = new Database("seller_saas.db");

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT,
    store_name TEXT,
    whatsapp_number TEXT
  );

  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    seller_id INTEGER,
    title TEXT,
    slug TEXT UNIQUE,
    price REAL,
    description TEXT,
    images TEXT, -- JSON array
    whatsapp_number TEXT,
    wilaya_info TEXT,
    FOREIGN KEY(seller_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER,
    customer_name TEXT,
    customer_phone TEXT,
    customer_address TEXT,
    customer_wilaya TEXT,
    status TEXT DEFAULT 'New',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(product_id) REFERENCES products(id)
  );
`);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post("/api/auth/signup", (req, res) => {
    const { email, password, storeName } = req.body;
    try {
      const stmt = db.prepare("INSERT INTO users (email, password, store_name) VALUES (?, ?, ?)");
      const result = stmt.run(email, password, storeName);
      res.json({ id: result.lastInsertRowid, email, storeName });
    } catch (e) {
      res.status(400).json({ error: "User already exists" });
    }
  });

  app.post("/api/auth/login", (req, res) => {
    const { email, password } = req.body;
    const user = db.prepare("SELECT * FROM users WHERE email = ? AND password = ?").get(email, password);
    if (user) {
      res.json(user);
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  });

  app.get("/api/products", (req, res) => {
    const sellerId = req.query.sellerId;
    const products = db.prepare("SELECT * FROM products WHERE seller_id = ?").all(sellerId);
    res.json(products);
  });

  app.get("/api/products/:slug", (req, res) => {
    const product = db.prepare("SELECT * FROM products WHERE slug = ?").get(req.params.slug);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  });

  app.post("/api/products", (req, res) => {
    const { sellerId, title, slug, price, description, images, whatsappNumber, wilayaInfo } = req.body;
    const stmt = db.prepare(`
      INSERT INTO products (seller_id, title, slug, price, description, images, whatsapp_number, wilaya_info)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const result = stmt.run(sellerId, title, slug, price, description, JSON.stringify(images), whatsappNumber, wilayaInfo);
    res.json({ id: result.lastInsertRowid });
  });

  app.get("/api/orders", (req, res) => {
    const sellerId = req.query.sellerId;
    const orders = db.prepare(`
      SELECT o.*, p.title as product_title 
      FROM orders o 
      JOIN products p ON o.product_id = p.id 
      WHERE p.seller_id = ?
      ORDER BY o.created_at DESC
    `).all(sellerId);
    res.json(orders);
  });

  app.post("/api/orders", (req, res) => {
    const { productId, customerName, customerPhone, customerAddress, customerWilaya } = req.body;
    const stmt = db.prepare(`
      INSERT INTO orders (product_id, customer_name, customer_phone, customer_address, customer_wilaya)
      VALUES (?, ?, ?, ?, ?)
    `);
    const result = stmt.run(productId, customerName, customerPhone, customerAddress, customerWilaya);
    res.json({ id: result.lastInsertRowid });
  });

  app.patch("/api/orders/:id", (req, res) => {
    const { status } = req.body;
    db.prepare("UPDATE orders SET status = ? WHERE id = ?").run(status, req.params.id);
    res.json({ success: true });
  });

  app.get("/api/stats/:sellerId", (req, res) => {
    const sellerId = req.params.sellerId;
    const revenue = db.prepare(`
      SELECT SUM(p.price) as total 
      FROM orders o 
      JOIN products p ON o.product_id = p.id 
      WHERE p.seller_id = ? AND o.status = 'Delivered'
    `).get(sellerId);
    
    const ordersCount = db.prepare(`
      SELECT COUNT(*) as count 
      FROM orders o 
      JOIN products p ON o.product_id = p.id 
      WHERE p.seller_id = ?
    `).get(sellerId);

    const productsCount = db.prepare("SELECT COUNT(*) as count FROM products WHERE seller_id = ?").get(sellerId);

    res.json({
      revenue: revenue.total || 0,
      orders: ordersCount.count,
      products: productsCount.count,
      visitors: Math.floor(Math.random() * 1000) + 500 // Mocked visitors
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
