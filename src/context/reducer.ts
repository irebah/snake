import {
  Action,
  GameState,
  INCREASE_COUNTER,
  SET_READY,
  START_GAME,
  STOP_GAME,
} from "./types";

const reducer = (state: GameState, action: Action): GameState => {
  switch (action.type) {
    case START_GAME:
      return {
        ...state,
        activeGame: true,
      };

    case STOP_GAME:
      return {
        ...state,
        readyGame: false,
        activeGame: false,
      };

    case INCREASE_COUNTER:
      return {
        ...state,
        score: state.score + 1,
      };

    case SET_READY:
      return {
        ...state,
        readyGame: true,
      };

    default:
      throw new Error("Unknown action type");
  }
};

export default reducer;
