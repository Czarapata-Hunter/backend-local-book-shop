const pool = require('../utils/pool');

class Book {
  constructor({ id, title, released, pairings }) {
    this.id = id;
    this.title = title;
    this.released = released;
    this.pairings = pairings;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM books');
    return rows.map((row) => new Book(row));
  }
}

module.exports = { Book };
