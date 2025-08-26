const { Pool } = require('pg');
const config = require('../config');

class DatabasePool {
  constructor() {
    this.pool = new Pool(config.db);
  }
  query(text, params) {
    return this.pool.query(text, params);
  }
  async close() {
    await this.pool.end();
  }
}

module.exports = new DatabasePool();
