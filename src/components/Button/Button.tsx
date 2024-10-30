import { useGameContext } from "../../context";
import { SET_READY } from "../../context/types";
import { logEvent } from "../../utils/analytics";

const Button = () => {
  const { state, dispatch } = useGameContext();

  const initGame = () => {
    if (!state.readyGame) {
      dispatch({ type: SET_READY });
      logEvent("game_ready");
    }
  };

  return (
    <button
      className="text-black bg-white px-3 py-1 rounded-lg text-3xl shadow-xl"
      onClick={initGame}
    >
      Start
    </button>
  );
};
export default Button;
