import { InMemoryMoviesRepository } from "@/repositories/in-memory/in-memory-use-case";
import { PrizeRangeUseCase } from "./prize-range";
import { IMoviesRepository } from "@/interfaces/movies";
import { NoDataInDatabaseError } from "./errors/no-data-in-database-error";

let moviesRepository: IMoviesRepository;
let sut: PrizeRangeUseCase;

describe("Prize Range Use Case", () => {
  beforeEach(() => {
    moviesRepository = new InMemoryMoviesRepository();
    sut = new PrizeRangeUseCase(moviesRepository);
  });

  it("should be able to get producers prize range", async () => {
    await Promise.all([
      moviesRepository.create({
        title: "teste 1",
        year: 2000,
        producers: "Produtor A",
        studios: "Test 1",
        winner: "yes",
      }),
      moviesRepository.create({
        title: "teste 2",
        year: 2002,
        producers: "Produtor A",
        studios: "Test 1",
        winner: "yes",
      }),
      moviesRepository.create({
        title: "teste 3",
        year: 2000,
        producers: "Produtor B",
        studios: "Test 2",
        winner: "yes",
      }),
      moviesRepository.create({
        title: "teste 4",
        year: 2015,
        producers: "Produtor B",
        studios: "Test 2",
        winner: "yes",
      }),
      moviesRepository.create({
        title: "teste 4",
        year: 2018,
        producers: "Produtor C",
        studios: "Test 2",
        winner: "",
      }),
    ]);

    const prizeRange = await sut.execute();
    expect(prizeRange).toHaveProperty("min");
  });

  it("should not be able to obtain the producers premium range when not given in the database", async () => {
    expect(() => sut.execute()).rejects.toBeInstanceOf(NoDataInDatabaseError);
  });
});
