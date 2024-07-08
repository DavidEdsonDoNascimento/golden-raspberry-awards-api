import { Request, Response } from "express";
import { Movie } from "@/@Types/Movie";
import { ProducerViewModel, ViewModel } from "@/@Types/Producer";
import { prisma } from "@/lib/prisma";

export class ProducersController {
  static async getPrizeRange(req: Request, res: Response) {
    console.log("ProducersController.getPrizeRange");

    if (!(await prisma.movies.findMany()).length) {
      return res.status(200).json({
        ok: false,
        error:
          "No movies found in the database. Load data mass via route /movies",
      });
    }

    const featuredProducers = await prisma.movies.groupBy({
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

    const winningFilms = await prisma.movies.findMany({
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

    const viewModel: ViewModel = {
      min: [],
      max: [],
    };

    // rule: above 5 years goes to max and below goes to min
    const rule = 5;

    for (const featuredProducer of featuredProducers) {
      // filters films by the featured producer and sorts the years
      const filmsByProducer = winningFilms
        .filter((film) => {
          return film.producers === featuredProducer.producers;
        })
        .sort((a, b) => (a.year >= b.year ? -1 : 1));

      let interval: number = filmsByProducer[0].year;

      filmsByProducer.forEach((film, index) => {
        if (index === 0) {
          return;
        }
        interval -= film.year;
      });

      if (interval >= rule) {
        viewModel.max.push(
          ProducersController.getViewModel(
            featuredProducer.producers,
            filmsByProducer,
            interval
          )
        );
        continue;
      }

      viewModel.min.push(
        ProducersController.getViewModel(
          featuredProducer.producers,
          filmsByProducer,
          interval
        )
      );
    }

    return res.status(200).json(viewModel);
  }

  static getViewModel(
    producer: string,
    filmsByProducer: Array<Movie>,
    interval: number
  ): ProducerViewModel {
    return {
      producer,
      interval,
      previousWin: filmsByProducer[filmsByProducer.length - 1].year,
      followingWin: filmsByProducer[0].year,
    };
  }
}
