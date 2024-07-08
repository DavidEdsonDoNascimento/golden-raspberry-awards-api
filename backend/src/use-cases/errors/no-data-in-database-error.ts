export class NoDataInDatabaseError extends Error {
  constructor() {
    super("No movies found in the database. Load data mass via route /movies.");
  }
}
