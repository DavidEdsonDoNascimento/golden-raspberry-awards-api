import { InMemoryMoviesRepository } from "@/repositories/in-memory/in-memory-use-case";
import { PrizeRangeUseCase } from "./prize-range";

describe("Prize Range Use Case", () => {
  it("should be able to get producers prize range", async () => {
    const moviesRepository = new InMemoryMoviesRepository();
    for (let i = 1; i < 10; i++) {
      await moviesRepository.create({
        title: `Test ${i}`,
        year: +`200${i}`,
        producers: i % 2 == 0 ? "Bo Derek" : "Joel Silver",
        studios: "Test",
        winner: "yes",
      });
    }
    const prizeRangeUseCase = new PrizeRangeUseCase(moviesRepository);
    await expect(() => prizeRangeUseCase.execute()).resolves.toHaveProperty(
      "min"
    );
  });
});
