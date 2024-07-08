import { PrismaMoviesRepository } from "@/repositories/prisma/prisma-movies-repository";
import { IMovie, IMoviesRepository } from "@/interfaces/movies";
import { MoviesUseCase } from "@/use-cases/movies";
import { Request, Response } from "express";

export class MoviesController {
  static async getMovies(req: Request, res: Response) {
    console.log("MoviesController.getMovies");

    const moviesRepository: IMoviesRepository = new PrismaMoviesRepository();
    const movies = await moviesRepository.getMovies();

    return res.status(200).json({
      ok: true,
      movies,
    });
  }

  static async getWinners(req: Request, res: Response) {
    console.log("MoviesController.getWinners");

    const moviesRepository: IMoviesRepository = new PrismaMoviesRepository();
    const movies = await moviesRepository.getWinningMovies();

    return res.status(200).json({
      ok: true,
      movies,
    });
  }

  static async loadMoviesToBD(req: Request, res: Response) {
    console.log("MoviesController.loadMoviesToBD");

    const { file } = req;
    const { buffer } = file;

    const moviesRepository: IMoviesRepository = new PrismaMoviesRepository();
    const moviesUseCase = new MoviesUseCase(moviesRepository);

    await moviesUseCase.loadMoviesByBuffer(buffer);

    return res.status(201).json({
      ok: true,
      database_status: "loaded",
    });
  }

  static async update(req: Request, res: Response) {
    console.log("MoviesController.update");

    const { id } = req.params as { id: string };
    const { year, title, studios, producers, winner } =
      req.body as Partial<IMovie>;

    if (!year || !title || !studios || !producers) {
      return res.status(400).json({
        isUpdated: false,
        error:
          "Missing required fields: year, title, studios, producers, winner",
      });
    }

    const moviesRepository: IMoviesRepository = new PrismaMoviesRepository();
    await moviesRepository.update({
      id,
      year,
      title,
      studios,
      producers,
      winner,
    });

    return res.status(200).json({
      isUpdated: true,
    });
  }

  static async deleteAll(req: Request, res: Response) {
    console.log("MoviesController.deleteAll");

    const moviesRepository: IMoviesRepository = new PrismaMoviesRepository();
    await moviesRepository.deleteEverything();

    return res.status(200).json({
      deleted: true,
      info: "all records have been deleted, import a new file via the /movies route (POST)",
    });
  }
}
