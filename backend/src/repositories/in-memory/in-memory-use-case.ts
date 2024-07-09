import {
  IMovie,
  IMovieUpdate,
  IMoviesRepository,
  IProducersByGroup,
} from "@/interfaces/movies";

class InMemoryMoviesRepository implements IMoviesRepository {
  private movies: IMovie[] = [];

  async getWinningMoviesWithProducers(): Promise<IMovie[]> {
    const moviesWithProducers = this.movies.filter((movie) => {
      return movie.winner === "yes" && !!movie.producers;
    });
    return moviesWithProducers;
  }

  async update(data: IMovieUpdate): Promise<void> {
    const newMovies: IMovie[] = [];
    this.movies.forEach((movie) => {
      if (movie.id === data.id) {
        newMovies.push({ ...data });
        return;
      }
      newMovies.push(movie);
    });
    this.movies = newMovies;
  }

  async getMovies(): Promise<IMovie[]> {
    return this.movies;
  }

  async getWinningMovies(): Promise<IMovie[]> {
    return this.movies.filter((movie) => movie.winner === "yes");
  }

  async deleteEverything(): Promise<void> {
    this.movies = [];
  }

  async getBiggestWinners(): Promise<IProducersByGroup[]> {
    const winningMovies = this.movies.filter((movie) => movie.winner === "yes");

    const rawList = winningMovies.map((movie) => movie.producers);

    const producersByGroup = this.getProducersByGroup(rawList);

    return producersByGroup;
  }

  private async getProducersByGroup(
    list: string[]
  ): Promise<IProducersByGroup[]> {
    const producersByGroup: IProducersByGroup[] = [];

    // Remove duplicates from the raw list
    for (let i = 0; i < list.length; i++) {
      if (list.indexOf(list[i]) === i) {
        producersByGroup.push({
          producers: list[i],
        });
      }
    }
    console.log(`producers: `, producersByGroup);
    return producersByGroup;
  }

  async create(data: IMovie): Promise<IMovie> {
    const movie: IMovie = {
      ...data,
      id: `movie-1-${data.year}`,
    };

    this.movies.push(movie);

    return movie;
  }
}

export { InMemoryMoviesRepository };
