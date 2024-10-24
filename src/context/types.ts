import { Dispatch } from "react";

export interface GameState {
  readyGame: boolean;
  activeGame: boolean;
  score: number;
}

export interface GameContextType {
  state: GameState;
  dispatch: Dispatch<Action>;
}

export const START_GAME = "START_GAME";
export const STOP_GAME = "STOP_GAME";
export const INCREASE_COUNTER = "INCREASE_COUNTER";
export const SET_READY = "SET_READY";

interface StartGame {
  type: typeof START_GAME;
}

interface StopGame {
  type: typeof STOP_GAME;
}

interface IncreaseCounter {
  type: typeof INCREASE_COUNTER;
}

interface SetReady {
  type: typeof SET_READY;
}

export type Action = StartGame | StopGame | IncreaseCounter | SetReady;
