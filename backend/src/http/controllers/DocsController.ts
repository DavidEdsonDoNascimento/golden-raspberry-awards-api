import { Request, Response } from "express";

type DocsRoute = {
  route: String;
  description: String;
  method: String;
  body?: String[];
  MultipartForm?: any;
};

class DocsController {
  static async docs(req: Request, res: Response): Promise<any> {
    const docsRoutes: DocsRoute[] = [
      {
        route: "/",
        description:
          "API documentation, showing existing routes and shipping parameters",
        method: "GET",
      },
      {
        route: "/movies",
        description:
          "Sends mass of data to the database (POST with file: search in collections [ ./collection-insomnia-requests-and-responses.json ] containing the name Get Prize Range)",
        method: "POST",
        MultipartForm: {
          file: "upload the file through the UI interface, search in collections [ ./collection-insomnia-requests-and-responses.json ]",
        },
      },
      {
        route: "/movies",
        description: "Gets all movies",
        method: "GET",
      },
      {
        route: "/movies/winners",
        description: "Gets the winning films",
        method: "GET",
      },
      {
        route: "/movies/<ID>",
        description: "Changes a movie is data using its id",
        method: "PUT",
        body: [
          "year: Number",
          "title: String",
          "studios: String",
          "producers: String",
          "winner: String",
        ],
      },
      {
        route: "/movies",
        description: "Deletes all movies / deletes mass of data from database",
        method: "DELETE",
      },
      {
        route: "/producers/prize-range",
        description:
          "Gets the set containing the producer with the greatest interval between two consecutive awards, and which got two awards faster, following the format specification defined in the ./documents/Especificação Backend.pdf (GET) file",
        method: "GET",
      },
    ];
    return res.status(200).json(docsRoutes);
  }
}

export { DocsController };
