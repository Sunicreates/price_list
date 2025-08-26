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
    const allowlist = [
      'https://price-list-sepia.vercel.app',
      'https://price-list-m9of.onrender.com',
      'https://price-list-g1z09xjk3-sunils-projects-bb89dc6c.vercel.app',
      'http://localhost:3000',
      'http://localhost:4000'
    ];
    const corsOptions = (req, callback) => {
      const origin = req.header('Origin');
      if (!origin || allowlist.includes(origin)) {
        callback(null, { origin: true, credentials: true });
      } else {
        callback(null, { origin: false });
      }
    };
    this.app.use(cors(corsOptions));
    this.app.options('*', cors(corsOptions));
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
