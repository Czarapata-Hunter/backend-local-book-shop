const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('authors routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('GET authors should return list of authors', async () => {
    const resp = await request(app).get('/authors');
    expect(resp.status).toBe(200);
    expect(resp.body.length).toBe(3);
    const rowling = resp.body.find((auth) => auth.id === '1');
    expect(rowling).toHaveProperty('name', 'J.K Rowling');
    expect(resp.body[0]).toEqual({
      id: expect.any(String),
      name: expect.any(String),
    });
  });

  it('GET authors/:id should return individual author and their books', async () => {
    const resp = await request(app).get('/authors/1');
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: '1',
      name: 'J.K Rowling',
      pairings: [
        {
          author_id: 1,
          book_id: 1,
          detail: 'The Sorcerers Stone',
          id: 1,
        },
        {
          author_id: 1,
          book_id: 2,
          detail: 'Chamber of Secrets',
          id: 2,
        },
        {
          author_id: 1,
          book_id: 3,
          detail: 'Prisoner of Azkaban',
          id: 3,
        },
        {
          author_id: 1,
          book_id: 4,
          detail: 'Goblet of Fire',
          id: 4,
        },
        {
          author_id: 1,
          book_id: 5,
          detail: 'Order of the Phoenix',
          id: 5,
        },
        {
          author_id: 1,
          book_id: 6,
          detail: 'Half-Blood Prince',
          id: 6,
        },
        {
          author_id: 1,
          book_id: 7,
          detail: 'Deathly Hallows',
          id: 7,
        },
      ],
    });
  });
  afterAll(() => {
    pool.end();
  });
});
