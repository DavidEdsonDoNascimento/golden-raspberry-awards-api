import {
  IMovie,
  IMovieUpdate,
  IMoviesRepository,
  IProducersByGroup,
} from "@/interfaces/movies";

class InMemoryMoviesRepository implements IMoviesRepository {
  getWinningMoviesWithProducers(): Promise<IMovie[]> {
    throw new Error("Method not implemented.");
  }
  update(data: IMovieUpdate): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getMovies(): Promise<IMovie[]> {
    throw new Error("Method not implemented.");
  }
  getWinningMovies(): Promise<IMovie[]> {
    throw new Error("Method not implemented.");
  }
  deleteEverything(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getBiggestWinners(): Promise<IProducersByGroup[]> {
    throw new Error("Method not implemented.");
  }
  private movies: IMovie[] = [];

  async create(data: IMovie): Promise<IMovie> {
    const movie: IMovie = {
      ...data,
      id: "movie-1",
    };

    this.movies.push(movie);

    return movie;
  }
}

export { InMemoryMoviesRepository };
