import { HIGHEST_SCORE_KEY } from "../constants";

describe("initialState", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  test("it should retrieve the highest score from the local storage if available", async () => {
    const highestScore = 5;
    const getItemSpy = vi.spyOn(localStorage, "getItem");
    getItemSpy.mockReturnValue(`${highestScore}`);

    const state = await import("./initialState");

    expect(getItemSpy).toHaveBeenCalledWith(HIGHEST_SCORE_KEY);
    expect(state.default.highestScore).toBe(highestScore);
  });

  test("it should retrieve the highest score as 0 from the local storage if not available", async () => {
    const getItemSpy = vi.spyOn(localStorage, "getItem");

    const state = await import("./initialState");

    expect(getItemSpy).toHaveBeenCalledWith(HIGHEST_SCORE_KEY);
    expect(state.default.highestScore).toBe(0);
  });
});
