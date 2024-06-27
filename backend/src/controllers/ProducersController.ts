import { Request, Response } from 'express';
import { client } from 'src/database/client';

export class ProducersController {

  static async getPrizeRange(req: Request, res: Response) {

    console.log('ProducersController.getPrizeRange');

    const moviesMin = await client.movies.groupBy({
      by: ['producers', 'winner'],
      where: {
        winner: 'yes'
      },
      having: {
        year: {
          _count: {
            gte: 2
          }
        }
      }
    });

    return res.status(200).json({
      min: moviesMin,
      // max: moviesMax
    });
  }
}