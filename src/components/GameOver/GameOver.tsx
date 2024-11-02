import { useEffect, useRef } from "react";
import { useGameContext } from "../../context";
import { SET_READY } from "../../context/types";
import { logEvent } from "../../utils/analytics";

const GameOver = () => {
  const { state, dispatch } = useGameContext();
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (buttonRefs.current[0]) {
      buttonRefs.current[0]?.focus();
    }
  }, []);

  const initGame = () => {
    if (!state.readyGame) {
      dispatch({ type: SET_READY });
      logEvent("game_ready");
    }
  };

  const optionClicked = (option: string) => {
    if (option === "Yes") {
      logEvent("restart_game");
      initGame();
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    option: string
  ) => {
    if (event.key === "Enter") {
      optionClicked(option);
    }

    if (event.key === "ArrowRight" && buttonRefs.current[1]) {
      buttonRefs.current[1]?.focus();
    }

    if (event.key === "ArrowLeft" && buttonRefs.current[0]) {
      buttonRefs.current[0]?.focus();
    }
  };

  return (
    <div className="bg-gray-400/60 z-10 h-full w-full absolute rounded-xl border-4 flex flex-col gap-10 justify-center items-center text-4xl font-PressStart2P">
      <span className="text-6xl text-center text-outline">Game over</span>
      <p className="mt-10">Continue?</p>
      <div className="flex gap-20">
        {["Yes", "No"].map((option, index) => (
          <button
            data-testid={`option-${option}`}
            ref={(el) => (buttonRefs.current[index] = el)}
            key={option}
            onClick={() => optionClicked(option)}
            onKeyDown={(e) => handleKeyDown(e, option)}
            tabIndex={0}
            className="cursor-pointer focus:text-custom-red focus:outline-none focus:underline"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GameOver;
