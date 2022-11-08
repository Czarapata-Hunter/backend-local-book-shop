const pool = require('../utils/pool');

class Author {
  constructor({ id, name }) {
    this.id = id;
    this.name = name;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM authors');
    return rows.map((row) => new Author(row));
  }
}

module.exports = { Author };
