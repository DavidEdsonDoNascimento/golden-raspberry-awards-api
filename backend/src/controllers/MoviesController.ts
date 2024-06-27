import { Request, Response } from 'express';
import { Readable } from 'stream';

import readLine from 'readline';
import { Movie } from 'src/@Types/Movie';
import { client } from 'src/database/client';
import * as fs from "fs";
import * as path from "path";
import { parse } from 'csv-parse';
import csv from 'csv';


export class MoviesController {

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
    }

    return res.status(201).json({
      ok: true,
      database_status: 'loaded'
    });
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params as { id: string };
    const { year, title, studios, producers, winner } = req.body as Partial<Movie>;

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
    })
  }
}