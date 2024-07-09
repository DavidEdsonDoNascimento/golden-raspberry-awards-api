import { InMemoryMoviesRepository } from "@/repositories/in-memory/in-memory-use-case";
import { PrizeRangeUseCase } from "./prize-range";

describe("Prize Range Use Case", () => {
  it("should be able to get producers prize range", async () => {
    const moviesRepository = new InMemoryMoviesRepository();
    const prizeRangeUseCase = new PrizeRangeUseCase(moviesRepository);

    await Promise.all([
      moviesRepository.create({
        title: "teste 1",
        year: 2000,
        producers: "Produtor A",
        studios: "Test 1",
        winner: "yes",
      }),
      moviesRepository.create({
        title: "teste 1",
        year: 2002,
        producers: "Produtor A",
        studios: "Test 1",
        winner: "yes",
      }),
      moviesRepository.create({
        title: "teste 1",
        year: 2000,
        producers: "Produtor B",
        studios: "Test 2",
        winner: "yes",
      }),
      moviesRepository.create({
        title: "teste 1",
        year: 2015,
        producers: "Produtor B",
        studios: "Test 2",
        winner: "yes",
      }),
    ]);

    const prizeRange = await prizeRangeUseCase.execute();
    expect(prizeRange).toHaveProperty("min");
  });
});
