const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('authors routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('should return a list of authors with nested books', async () => {
    const res = await request(app).get('/authors');
    expect(res.body.length).toEqual(3);
    const jkrowling = res.body.find((auth) => auth.id === '1');
    expect(jkrowling).toHaveProperty('name', 'J.K Rowling');
    expect(jkrowling).toHaveProperty('pairings');
    expect(jkrowling.pairings[0]).toHaveProperty('detail');
    expect(jkrowling.pairings[0]).toHaveProperty('author_id');
    expect(jkrowling.pairings[0]).toHaveProperty('id');
  });

  afterAll(() => {
    pool.end();
  });
});
