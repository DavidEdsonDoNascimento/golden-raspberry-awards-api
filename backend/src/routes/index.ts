import { Router } from 'express';
import { DocsController } from '@controllers/DocsController';
import { MoviesController } from '@controllers/MoviesController';

import multer from "multer";
import { ProducersController } from '@controllers/ProducersController';

const routes = Router();
const multerConfig = multer();

routes
  .get('/', DocsController.docs)
  .get('/movies', MoviesController.getMovies)
  .get('/movies/winners', MoviesController.getWinners)
  .post('/movies', multerConfig.single("file"), MoviesController.loadMoviesToBD)
  .put('/movies/:id', MoviesController.update)
  .delete('/movies', MoviesController.deleteAll)
  .get('/producers/prize-range', ProducersController.getPrizeRange);

export { routes };