import { Router } from 'express';
import { DocsController } from '@controllers/DocsController';

const routes = Router();

routes
  .get('/', DocsController.docs)
// .get('/customer/:customerId', CustomerController.getCustomerById)
// .get('/customer', CustomerController.read)
// .post('/customer', CustomerController.create)
// .post('/customer/:customerId', CustomerController.update)
// .delete('/customer/:customerId', CustomerController.delete)
// .get('/contact/:contactId', ContactController.getContactById)
// .get('/contact', ContactController.read)
// .post('/contact', ContactController.create)
// .post('/contact/:contactId', ContactController.update)
// .delete('/contact/:contactId', ContactController.delete);


export { routes };