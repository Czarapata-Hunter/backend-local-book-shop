const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('books routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('GET books should return list of books', async () => {
    const resp = await request(app).get('/books');
    expect(resp.status).toBe(200);
    expect(resp.body.length).toBe(14);
    const stone = resp.body.find((book) => book.id === '1');
    expect(stone).toHaveProperty('title', 'Philosophers Stone');
    expect(stone).toHaveProperty('released', '1997');
  });

  it('GET books/:id should return individual books with correct author', async () => {
    const resp = await request(app).get('/books/1');
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: '1',
      pairings: [
        {
          author_id: 1,
          book_id: 1,
          detail: 'The Sorcerers Stone',
          id: 1,
        },
      ],
      released: '1997',
      title: 'Philosophers Stone',
    });
  });

  afterAll(() => {
    pool.end();
  });
});
