import {
  IMovie,
  IMovieUpdate,
  IMoviesRepository,
  IProducersByGroup,
} from "@/interfaces/movies";
import { prisma } from "@/lib/prisma";

export class PrismaMoviesRepository implements IMoviesRepository {
  async getWinningMoviesWithProducers(): Promise<IMovie[]> {
    const movies = await prisma.movies.findMany({
      where: {
        winner: "yes",
        producers: {
          not: "",
        },
      },
      orderBy: {
        year: "desc",
      },
    });

    return movies;
  }

  async getBiggestWinners(): Promise<IProducersByGroup[]> {
    const movies = await prisma.movies.groupBy({
      by: ["producers"],
      where: {
        winner: "yes",
      },
      having: {
        year: {
          _count: {
            gte: 2,
          },
        },
      },
    });
    return movies;
  }

  async create(data: IMovie): Promise<IMovie> {
    const movie = await prisma.movies.create({
      data,
    });
    return movie;
  }

  async update(data: IMovieUpdate): Promise<void> {
    const { id } = data;
    const { year, title, studios, producers, winner } = data;

    await prisma.movies.findUniqueOrThrow({
      where: {
        id,
      },
    });

    await prisma.movies.update({
      where: { id },
      data: {
        year,
        title,
        studios,
        producers,
        winner,
      },
    });
  }

  async getMovies() {
    const movies = await prisma.movies.findMany();
    return movies;
  }

  async getWinningMovies() {
    const movies = await prisma.movies.findMany({
      where: { winner: "yes" },
      orderBy: {
        year: "desc",
      },
    });
    return movies;
  }

  async deleteEverything(): Promise<void> {
    await prisma.movies.deleteMany({});
  }
}
