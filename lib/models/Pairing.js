const pool = require('../utils/pool');

class Pairing {
  id;
  detail;
  author_id;

  constructor(row) {
    this.id = row.id;
    this.detail = row.detail;
    this.author_id = row.author_id;
  }

  static async count() {
    const { rows } = await pool.query('SELECT COUNT(*) FROM pairings');
    return Number(rows[0].count); /* Number might not be correct here... */
  }
}

module.exports = { Pairing };
