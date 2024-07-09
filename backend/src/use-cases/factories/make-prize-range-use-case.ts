import { PrismaMoviesRepository } from "@/repositories/prisma/prisma-movies-repository";
import { PrizeRangeUseCase } from "../prize-range";

export const makePrizeRangeUseCase = () => {
  const moviesRepository = new PrismaMoviesRepository();
  const prizeRangeUseCase = new PrizeRangeUseCase(moviesRepository);
  return prizeRangeUseCase;
};
