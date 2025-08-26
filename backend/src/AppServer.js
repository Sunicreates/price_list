const express = require('express');
const cors = require('cors');
const config = require('./config');
const productRoutes = require('./routes/productRoutes');

class AppServer {
  constructor() {
    this.app = express();
    this.configure();
    this.routes();
  }
  configure() {
    this.app.use(cors());
    this.app.use(express.json());
  }
  routes() {
    this.app.use('/products', productRoutes);
    this.app.get('/health', (req, res) => res.json({ status: 'ok' }));
  }
  listen() {
    const port = config.port;
    this.server = this.app.listen(port, () => console.log(`Backend running on port ${port}`));
    return this.server;
  }
  close() {
    if (this.server) this.server.close();
  }
}

module.exports = AppServer;
