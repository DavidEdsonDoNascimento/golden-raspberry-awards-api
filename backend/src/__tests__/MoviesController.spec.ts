/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import { app } from '../app';
import request from 'supertest';

describe('Create Movie Controller', () => {
  it('should be able to get the movies', async () => {
    const response = await request(app)
      .get('/movies');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("movies");
  })

  it('should be able to Gets the winning films', async () => {
    const response = await request(app)
      .get('/movies/winners');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("movies");
  })

  it('should be able to sends mass of data to the database', async () => {
    const response = await request(app)
      .post('/movies')
      .attach('file', `${__dirname}/__mocks__/movieListTest.csv`);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("database_status");
  })

  it('should be able to deletes all movies / deletes mass of data from database', async () => {
    const response = await request(app)
      .delete('/movies');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("deleted");
  })
})