import { Request, Response } from 'express';
import { Readable } from 'stream';
import { Movie } from '@@Types/Movie';
import { client } from '@database/client';
import readLine from 'readline';

export class MoviesController {

  static async getMovies(req: Request, res: Response) {

    console.log('MoviesController.getMovies');

    const movies = await client.movies.findMany();

    return res.status(200).json({
      ok: true,
      movies
    });
  }

  static async getWinners(req: Request, res: Response) {

    console.log('MoviesController.getWinners');

    const movies = await client.movies.findMany({
      where: { winner: "yes" },
      orderBy: {
        year: 'desc'
      }
    });

    return res.status(200).json({
      ok: true,
      movies
    });
  }

  static async loadMoviesToBD(req: Request, res: Response) {

    console.log('MoviesController.loadMoviesToBD');

    const { file } = req;
    const { buffer } = file;

    const readableFile = new Readable();

    readableFile.push(buffer);
    readableFile.push(null);
    readableFile.setEncoding('utf8');

    const moviesLine = readLine.createInterface({
      input: readableFile,
    });

    for await (let line of moviesLine) {
      const movieLineSplit = line.split(';');

      if (isNaN(parseInt(movieLineSplit[0]))) {
        continue;
      }

      // there may be more producers in the same field
      if (!movieLineSplit[3].includes(' and ')) {
        const movie: Movie = {
          year: parseInt(movieLineSplit[0]),
          title: movieLineSplit[1] || '',
          studios: movieLineSplit[2] || '',
          producers: movieLineSplit[3] || '',
          winner: movieLineSplit[4] || '',
        };
        await client.movies.create({
          data: movie
        });
        continue;
      }

      const firstProducers = movieLineSplit[3].split(' and ')[0].split(',');
      const lastProducer = movieLineSplit[3].split(' and ')[1];

      for (const producer of firstProducers) {
        const movie: Movie = {
          year: parseInt(movieLineSplit[0]),
          title: movieLineSplit[1] || '',
          studios: movieLineSplit[2] || '',
          producers: producer.trimStart(),
          winner: movieLineSplit[4] || '',
        };
        await client.movies.create({
          data: movie
        });
      }

      const movie: Movie = {
        year: parseInt(movieLineSplit[0]),
        title: movieLineSplit[1] || '',
        studios: movieLineSplit[2] || '',
        producers: lastProducer,
        winner: movieLineSplit[4] || '',
      };

      await client.movies.create({
        data: movie
      });
    }

    return res.status(201).json({
      ok: true,
      database_status: 'loaded'
    });
  }

  static async update(req: Request, res: Response) {
    console.log('MoviesController.update');

    const { id } = req.params as { id: string };
    const { year, title, studios, producers, winner } = req.body as Partial<Movie>;

    if (!year || !title || !studios || !producers) {
      return res.status(400).json({
        isUpdated: false,
        error: 'Missing required fields: year, title, studios, producers, winner'
      })
    }

    await client.movies.findUniqueOrThrow({
      where: {
        id
      }
    });

    await client.movies.update({
      where: { id },
      data: {
        year,
        title,
        studios,
        producers,
        winner
      }
    });

    return res.status(200).json({
      isUpdated: true,
    });
  }
  static async deleteAll(req: Request, res: Response) {
    console.log('MoviesController.deleteAll');

    await client.movies.deleteMany({});

    return res.status(200).json({
      deleted: true,
      info: 'all records have been deleted, import a new file via the /movies route (POST)'
    });
  }
}