const db = require('../db/Pool');
const Product = require('../models/Product');

class ProductService {
  sanitizeNumeric(v) {
    if (v === '' || v === undefined || v === null) return null;
    const n = Number(v);
    return Number.isNaN(n) ? null : n;
  }

  mapRow(row) { return new Product(row); }

  async list() {
    const res = await db.query('SELECT * FROM products ORDER BY id');
    return res.rows.map(r => this.mapRow(r));
  }

  async create(data) {
    const cleaned = {
      article_no: data.article_no || null,
      product_service: data.product_service || null,
      in_price: this.sanitizeNumeric(data.in_price),
      price: this.sanitizeNumeric(data.price),
      unit: data.unit || null,
      in_stock: this.sanitizeNumeric(data.in_stock),
      description: data.description || null,
    };
    const res = await db.query(
      'INSERT INTO products (article_no, product_service, in_price, price, unit, in_stock, description) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *',
      [cleaned.article_no, cleaned.product_service, cleaned.in_price, cleaned.price, cleaned.unit, cleaned.in_stock, cleaned.description]
    );
    return this.mapRow(res.rows[0]);
  }

  async update(id, data) {
    const cleaned = {
      article_no: data.article_no || null,
      product_service: data.product_service || null,
      in_price: this.sanitizeNumeric(data.in_price),
      price: this.sanitizeNumeric(data.price),
      unit: data.unit || null,
      in_stock: this.sanitizeNumeric(data.in_stock),
      description: data.description || null,
    };
    await db.query(
      'UPDATE products SET article_no=$1, product_service=$2, in_price=$3, price=$4, unit=$5, in_stock=$6, description=$7 WHERE id=$8',
      [cleaned.article_no, cleaned.product_service, cleaned.in_price, cleaned.price, cleaned.unit, cleaned.in_stock, cleaned.description, id]
    );
    return { id: Number(id), ...cleaned };
  }
}

module.exports = new ProductService();
