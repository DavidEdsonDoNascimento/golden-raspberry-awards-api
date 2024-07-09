import { Request, Response } from "express";
import { makePrizeRangeUseCase } from "@/use-cases/factories/make-prize-range-use-case";
import { NoDataInDatabaseError } from "@/use-cases/errors/no-data-in-database-error";
import { IViewModel } from "@/interfaces/Producer";

export class ProducersController {
  static async getPrizeRange(req: Request, res: Response) {
    console.log("ProducersController.getPrizeRange");

    const prizeRangeUseCase = makePrizeRangeUseCase();

    let viewModel: IViewModel;

    try {
      viewModel = await prizeRangeUseCase.execute();
    } catch (err) {
      if (err instanceof NoDataInDatabaseError) {
        return res.status(200).json({ message: "No data in database" });
      }
      return res.status(500).json({ message: "Internal Server Error" });
    }

    return res.status(200).json(viewModel);
  }
}
