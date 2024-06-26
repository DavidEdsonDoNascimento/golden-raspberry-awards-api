import { Request, Response } from "express";

type DocsRoute = {
  route: String,
  description: String,
  method: String,
  body?: String[]
};

class DocsController {
  static async docs(req: Request, res: Response): Promise<any> {
    const docsRoutes: DocsRoute[] = [
      {
        route: '/',
        description: 'API documentation, showing existing routes and shipping parameters',
        method: 'GET'
      },
    ];
    return res.status(200).json(docsRoutes);
  }
}

export { DocsController }