import { HIGHEST_SCORE_KEY } from "../constants";
import { getFieldFromLocalStorage } from "../utils/board";
import { GameState } from "./types";

const initialState: GameState = {
  readyGame: false,
  activeGame: false,
  score: 0,
  highestScore: getFieldFromLocalStorage(HIGHEST_SCORE_KEY),
};

export default initialState;
