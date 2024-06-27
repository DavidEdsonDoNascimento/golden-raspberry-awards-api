import { Router } from 'express';
import { DocsController } from '@controllers/DocsController';
import { MoviesController } from '@controllers/MoviesController';

import multer from "multer";
import { ProducersController } from '@controllers/ProducersController';

const routes = Router();
const multerConfig = multer();

routes
  .get('/', DocsController.docs)
  .post('/movies', multerConfig.single("file"), MoviesController.loadMoviesToBD)
  .put('/movies/:id', MoviesController.update)
  .get('/producers/prize-range', ProducersController.getPrizeRange)
  .delete('/movies', MoviesController.deleteAll);

export { routes };