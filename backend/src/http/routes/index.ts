import { Router } from "express";
import { DocsController } from "@/http/controllers/DocsController";
import { MoviesController } from "@/http/controllers/MoviesController";
import { ProducersController } from "@/http/controllers/ProducersController";

import multer from "multer";

const routes = Router();
const multerConfig = multer();

routes
  .get("/", DocsController.docs)
  .get("/movies", MoviesController.getMovies)
  .get("/movies/winners", MoviesController.getWinners)
  .put("/movies/:id", MoviesController.update)
  .post("/movies", multerConfig.single("file"), MoviesController.loadMoviesToBD)
  .delete("/movies", MoviesController.deleteAll)
  .get("/producers/prize-range", ProducersController.getPrizeRange);

export { routes };
