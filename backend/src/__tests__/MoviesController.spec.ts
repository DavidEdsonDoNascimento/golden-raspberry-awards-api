/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import { response } from 'express';
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
})