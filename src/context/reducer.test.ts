import { HIGHEST_SCORE_KEY } from "../constants";
import initialState from "./initialState";
import reducer from "./reducer";
import { GameState, INCREASE_COUNTER, SET_READY, START_GAME, STOP_GAME } from "./types";

describe("reducer", () => {
  test("it should allow to start a game", () => {
    const state: GameState = { ...initialState };

    expect(state.activeGame).toBe(false);

    const result: GameState = reducer(state, { type: START_GAME });

    expect(result.activeGame).toBe(true);
  });

  test("it should allow to stop the game", () => {
    const state: GameState = {
      ...initialState,
      activeGame: true,
      readyGame: true,
    };

    const result: GameState = reducer(state, { type: STOP_GAME });

    expect(result.activeGame).toBe(true);
    expect(result.readyGame).toBe(false);
  });

  test("it should update the highest score when the game ends", () => {
    const state: GameState = {
      ...initialState,
      score: 20,
      highestScore: 10,
    };

    const result: GameState = reducer(state, { type: STOP_GAME });

    expect(result.highestScore).toBe(state.score);
  });

  test("it should update the localstorage when the game ends", () => {
    const setItemSpy = vi.spyOn(localStorage, "setItem");

    const state: GameState = {
      ...initialState,
      score: 20,
      highestScore: 10,
    };

    reducer(state, { type: STOP_GAME });

    expect(setItemSpy).toHaveBeenCalledWith(HIGHEST_SCORE_KEY, `${state.score}`);
  });

  test("it should allow to increase the counter", () => {
    const initialScore = Math.floor(Math.random());
    const state: GameState = {
      ...initialState,
      score: initialScore,
    };

    const result: GameState = reducer(state, { type: INCREASE_COUNTER });

    expect(result.score).toBe(initialScore + 1);
  });

  test("it should increase the highest score when the score reaches it", () => {
    const initialScore = Math.floor(Math.random() + 7);
    const state: GameState = {
      ...initialState,
      score: initialScore,
      highestScore: initialScore,
    };

    const result: GameState = reducer(state, { type: INCREASE_COUNTER });

    expect(result.score).toBe(initialScore + 1);
    expect(result.highestScore).toBe(initialScore + 1);
  });

  test("it should not increase the highest score when is higher than the current already", () => {
    const initialScore = Math.floor(Math.random() + 7);
    const state: GameState = {
      ...initialState,
      score: initialScore,
      highestScore: initialScore + 5,
    };

    const result: GameState = reducer(state, { type: INCREASE_COUNTER });

    expect(result.score).toBe(initialScore + 1);
    expect(result.highestScore).toBe(state.highestScore);
  });

  test("it should allow to set the game as ready", () => {
    const state: GameState = {
      ...initialState,
      readyGame: false,
      activeGame: true,
    };

    const result: GameState = reducer(state, { type: SET_READY });

    expect(result.readyGame).toBe(true);
    expect(result.activeGame).toBe(false);
    expect(result.score).toBe(0);
  });

  test("it should return error if an unknow action type is sent", () => {
    const invalidCall = () =>
      // forcing to accept any so we can test a typescript error checking
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (reducer as any)(initialState, { type: "random" });

    expect(invalidCall).toThrow("Unknown action type");
  });
});
