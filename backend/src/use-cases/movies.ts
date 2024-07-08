import { IMovie, IMoviesRepository } from "@/interfaces/movies";
import { Readable } from "stream";

import readLine from "readline";

export class MoviesUseCase {
  constructor(private moviesRepository: IMoviesRepository) {}

  async loadMoviesByBuffer(buffer: Buffer): Promise<void> {
    const readableFile = new Readable();

    readableFile.push(buffer);
    readableFile.push(null);
    readableFile.setEncoding("utf8");

    const moviesLine = readLine.createInterface({
      input: readableFile,
    });

    for await (let line of moviesLine) {
      const movieLineSplit = line.split(";");

      if (isNaN(parseInt(movieLineSplit[0]))) {
        continue;
      }

      // there may be more producers in the same field
      if (!movieLineSplit[3].includes(" and ")) {
        const movie: IMovie = {
          year: parseInt(movieLineSplit[0]),
          title: movieLineSplit[1] || "",
          studios: movieLineSplit[2] || "",
          producers: movieLineSplit[3] || "",
          winner: movieLineSplit[4] || "",
        };
        await this.moviesRepository.create(movie);
        continue;
      }

      const firstProducers = movieLineSplit[3].split(" and ")[0].split(",");
      const lastProducer = movieLineSplit[3].split(" and ")[1];

      for (const producer of firstProducers) {
        const movie: IMovie = {
          year: parseInt(movieLineSplit[0]),
          title: movieLineSplit[1] || "",
          studios: movieLineSplit[2] || "",
          producers: producer.trimStart(),
          winner: movieLineSplit[4] || "",
        };
        await this.moviesRepository.create(movie);
      }

      const movie: IMovie = {
        year: parseInt(movieLineSplit[0]),
        title: movieLineSplit[1] || "",
        studios: movieLineSplit[2] || "",
        producers: lastProducer,
        winner: movieLineSplit[4] || "",
      };

      await this.moviesRepository.create(movie);
    }
  }
}
