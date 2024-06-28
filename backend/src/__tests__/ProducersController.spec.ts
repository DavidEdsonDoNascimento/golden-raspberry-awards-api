/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import { app } from '../app';
import request from 'supertest';

describe('Create Movie Controller', () => {
  it('should be able to gets the set containing the producer with the greatest interval between two consecutive awards, and which got two awards faster',
    async () => {
      const response = await request(app)
        .get('/producers/prize-range');

      expect(response.status).toBe(200);
    })
})