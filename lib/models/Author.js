const pool = require('../utils/pool');
const { Pairing } = require('./Pairing');

class Author {
  id;
  name;
  pairings;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.pairings =
      row.pairings.length > 0
        ? row.pairings.map((pairing) => new Pairing(pairing))
        : [];
  }

  static async getAll() {
    const { rows } = await pool.query(`
    SELECT authors.*,
    COALESCE(
        json_agg(to_jsonb(pairings))
        FILTER (WHERE pairings.id IS NOT NULL), '[]') as pairings
    FROM authors
    LEFT JOIN pairings
    ON authors.id = pairings.author_id
    GROUP BY authors.id
    ORDER BY authors.id;
    `);
    return rows.map((row) => new Author(row));
  }
}

module.exports = { Author };
