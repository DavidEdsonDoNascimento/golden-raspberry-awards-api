import { Request, Response } from 'express';

export class ProducersController {

  static async getPrizeRange(req: Request, res: Response) {

    console.log('ProducersController.getPrizeRange');

    return res.status(200).json({
      ok: true
    });
  }
}