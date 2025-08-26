const productService = require('../services/ProductService');

class ProductController {
  async list(req, res) {
    try {
      const products = await productService.list();
      res.json(products);
    } catch (e) {
      console.error('GET /products error', e);
      res.status(500).json({ error: 'Failed to fetch products' });
    }
  }
  async create(req, res) {
    try {
      const created = await productService.create(req.body || {});
      res.status(201).json(created);
    } catch (e) {
      console.error('POST /products error', e);
      res.status(500).json({ error: 'Failed to create product' });
    }
  }
  async update(req, res) {
    try {
      await productService.update(req.params.id, req.body || {});
      res.sendStatus(200);
    } catch (e) {
      console.error('PUT /products/:id error', e);
      res.status(500).json({ error: 'Failed to update product' });
    }
  }
}

module.exports = new ProductController();
