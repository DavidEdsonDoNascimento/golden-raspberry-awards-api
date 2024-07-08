import { Request, Response } from "express";
import { IProducerViewModel, IViewModel } from "@/interfaces/Producer";
import { IMovie, IMoviesRepository } from "@/interfaces/movies";
import { PrismaMoviesRepository } from "@/repositories/prisma/prisma-movies-repository";
import { MoviesUseCase } from "@/use-cases/movies";
import { PrizeRangeUseCase } from "@/use-cases/prize-range";

export class ProducersController {
  static async getPrizeRange(req: Request, res: Response) {
    console.log("ProducersController.getPrizeRange");

    const moviesRepository: IMoviesRepository = new PrismaMoviesRepository();
    const prizeRangeUseCase = new PrizeRangeUseCase(moviesRepository);
    const viewModel = await prizeRangeUseCase.execute();

    return res.status(200).json(viewModel);
  }
}
