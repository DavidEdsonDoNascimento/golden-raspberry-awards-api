import { IProducerViewModel, IViewModel } from "@/interfaces/Producer";
import { IMovie, IMoviesRepository } from "@/interfaces/movies";
import { NoDataInDatabaseError } from "./errors/no-data-in-database-error";

export class PrizeRangeUseCase {
  constructor(private moviesRepository: IMoviesRepository) {}

  async execute(): Promise<IViewModel> {
    if (!(await this.moviesRepository.getMovies()).length) {
      throw new NoDataInDatabaseError();
    }

    const featuredProducers = await this.moviesRepository.getBiggestWinners();
    const winningFilms =
      await this.moviesRepository.getWinningMoviesWithProducers();

    const viewModel: IViewModel = {
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
          this.getViewModel(
            featuredProducer.producers,
            filmsByProducer,
            interval
          )
        );
        continue;
      }

      viewModel.min.push(
        this.getViewModel(featuredProducer.producers, filmsByProducer, interval)
      );
    }

    return viewModel;
  }

  getViewModel(
    producer: string,
    filmsByProducer: Array<IMovie>,
    interval: number
  ): IProducerViewModel {
    return {
      producer,
      interval,
      previousWin: filmsByProducer[filmsByProducer.length - 1].year,
      followingWin: filmsByProducer[0].year,
    };
  }
}
