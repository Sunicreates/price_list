require('dotenv').config();

class Config {
  constructor() {
    this.port = process.env.PORT || 4000;
    this.db = {
      user: process.env.PGUSER,
      host: process.env.PGHOST,
      database: process.env.PGDATABASE,
      password: process.env.PGPASSWORD,
      port: process.env.PGPORT || 5432,
      ssl: process.env.PGSSLMODE ? { rejectUnauthorized: false } : undefined,
    };
  }
}

module.exports = new Config();
