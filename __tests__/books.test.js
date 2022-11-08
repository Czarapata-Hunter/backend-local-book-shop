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
    expect(resp.body[0]).toEqual({
      id: expect.any(String),
      title: expect.any(String),
      released: expect.any(String),
    });
  });

  afterAll(() => {
    pool.end();
  });
});
