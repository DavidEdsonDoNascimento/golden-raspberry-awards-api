import { Request, Response } from "express";
import { makePrizeRangeUseCase } from "@/use-cases/factories/make-prize-range-use-case";

export class ProducersController {
  static async getPrizeRange(req: Request, res: Response) {
    console.log("ProducersController.getPrizeRange");

    const prizeRangeUseCase = makePrizeRangeUseCase();

    const viewModel = await prizeRangeUseCase.execute();

    return res.status(200).json(viewModel);
  }
}
