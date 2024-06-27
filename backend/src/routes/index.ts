import { Router } from 'express';
import { DocsController } from '@controllers/DocsController';
import { MoviesController } from '@controllers/MoviesController';

import multer from "multer";

const routes = Router();
const multerConfig = multer();
routes
  .get('/', DocsController.docs)
  .post('/movies', multerConfig.single("file"), MoviesController.loadMoviesToBD)
  .put('/movies/:id', MoviesController.update)
// .get('/customer/:customerId', CustomerController.getCustomerById)
// .get('/customer', CustomerController.read)
// .post('/customer/:customerId', CustomerController.update)
// .delete('/customer/:customerId', CustomerController.delete)
// .get('/contact/:contactId', ContactController.getContactById)
// .get('/contact', ContactController.read)
// .post('/contact', ContactController.create)
// .post('/contact/:contactId', ContactController.update)
// .delete('/contact/:contactId', ContactController.delete);


export { routes };