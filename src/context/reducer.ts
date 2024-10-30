import { HIGHEST_SCORE_KEY } from "../constants";
import {
  Action,
  GameState,
  INCREASE_COUNTER,
  SET_READY,
  START_GAME,
  STOP_GAME,
} from "./types";

const stopGame = (state: GameState): GameState => {
  const highestScore = Math.max(state.highestScore, state.score);

  localStorage.setItem(HIGHEST_SCORE_KEY, `${highestScore}`);

  return {
    ...state,
    readyGame: false,
    highestScore,
  };
};

const reducer = (state: GameState, action: Action): GameState => {
  switch (action.type) {
    case START_GAME:
      return {
        ...state,
        activeGame: true,
      };

    case STOP_GAME:
      return stopGame(state);

    case INCREASE_COUNTER:
      return {
        ...state,
        score: state.score + 1,
        highestScore: Math.max(state.highestScore, state.score + 1),
      };

    case SET_READY:
      return {
        ...state,
        score: 0,
        readyGame: true,
        activeGame: false,
      };

    default:
      throw new Error("Unknown action type");
  }
};

export default reducer;
