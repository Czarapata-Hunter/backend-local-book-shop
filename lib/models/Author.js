const pool = require('../utils/pool');

class Author {
  constructor({ id, name, pairings }) {
    this.id = id;
    this.name = name;
    this.pairings = pairings;
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `SELECT authors.*,
      COALESCE(
          json_agg(to_jsonb(pairings))
          FILTER (WHERE pairings.id IS NOT NULL), '[]') as pairings
      FROM authors
      LEFT JOIN pairings
      ON authors.id = pairings.author_id
      WHERE authors.id = $1
      GROUP BY authors.id
      ORDER BY authors.id
      `,
      [id]
    );
    return new Author(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM authors');
    return rows.map((row) => new Author(row));
  }
}

module.exports = { Author };
