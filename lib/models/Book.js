const pool = require('../utils/pool');

class Book {
  constructor({ id, title, released, pairings }) {
    this.id = id;
    this.title = title;
    this.released = released;
    this.pairings = pairings;
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `SELECT books.*,
        COALESCE(
            json_agg(to_jsonb(pairings))
            FILTER (WHERE pairings.id IS NOT NULL), '[]') as pairings
            FROM books
            LEFT JOIN pairings
            ON books.id = pairings.book_id
            WHERE books.id = $1
            GROUP BY books.id
            ORDER BY books.id
        `,
      [id]
    );
    return new Book(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM books');
    return rows.map((row) => new Book(row));
  }
}

module.exports = { Book };
