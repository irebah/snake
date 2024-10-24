import { useGameContext } from "../../context";
import { SET_READY } from "../../context/types";

const Button = () => {
  const { state, dispatch } = useGameContext();

  const initGame = () => {
    if (!state.readyGame) {
      dispatch({ type: SET_READY });
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
