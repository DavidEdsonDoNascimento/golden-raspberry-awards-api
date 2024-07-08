interface IMovie {
  id?: string;
  year: number;
  title: string;
  studios: string;
  producers: string;
  winner: string;
}

interface IMovieUpdate {
  id: string;
  year: number;
  title: string;
  studios: string;
  producers: string;
  winner: string;
}

interface IProducersByGroup {
  producers: string;
}

interface IMoviesRepository {
  getWinningMoviesWithProducers(): Promise<IMovie[]>;
  create(data: IMovie): Promise<IMovie>;
  update(data: IMovieUpdate): Promise<void>;
  getMovies(): Promise<IMovie[]>;
  getWinningMovies(): Promise<IMovie[]>;
  deleteEverything(): Promise<void>;
  getBiggestWinners(): Promise<IProducersByGroup[]>;
}

export { IMovie, IMovieUpdate, IMoviesRepository, IProducersByGroup };
