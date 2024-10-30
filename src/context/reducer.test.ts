import initialState from "./initialState";
import reducer from "./reducer";
import {
  GameState,
  INCREASE_COUNTER,
  SET_READY,
  START_GAME,
  STOP_GAME,
} from "./types";

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

  test("it should allow to increase the counter", () => {
    const initialScore = Math.floor(Math.random());
    const state: GameState = {
      ...initialState,
      score: initialScore,
    };

    const result: GameState = reducer(state, { type: INCREASE_COUNTER });

    expect(result.score).toBe(initialScore + 1);
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
  });

  test("it should return error if an unknow action type is sent", () => {
    const invalidCall = () =>
      // forcing to accept any so we can test a typescript error checking
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (reducer as any)(initialState, { type: "random" });

    expect(invalidCall).toThrow("Unknown action type");
  });
});
