import { useEffect, useRef, useState } from "react";
import Board from "./components/Board/Board";
import { Size } from "./types";
import { useGameContext } from "./context";
import Info from "./components/Info/Info";
import GameOver from "./components/GameOver/GameOver";

const App = () => {
  const gameAreaRef = useRef<HTMLDivElement | null>(null);
  const [gameAreaSize, setGameAreaSize] = useState<Size>({
    width: 0,
    height: 0,
  });

  const { state } = useGameContext();

  useEffect(() => {
    const handleResize = () => {
      if (gameAreaRef.current) {
        setGameAreaSize({
          width: gameAreaRef.current.clientWidth,
          height: gameAreaRef.current.clientHeight,
        });
      }
    };

    setTimeout(handleResize, 300);

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <main className="flex-col gap-4 center w-screen h-screen sm:p-5 md:p-10 min-w-[345px]">
      <p className="text-4xl">Snake</p>
      <section className="gameArea center flex-col md:flex md:flex-row gap-3 relative">
        {!state.readyGame && state.activeGame && <GameOver />}
        <div
          data-testid="info-area"
          className="md:w-[150px] md:block w-full flex md:order-last mb-2 md:mb-0 md:ml-4 md:h-full"
        >
          <Info />
        </div>
        <div
          ref={gameAreaRef}
          data-testid="game-area"
          className="flex-1 md:h-100 h-full w-full overflow-hidden flex justify-center items-center"
        >
          <Board size={gameAreaSize}></Board>
        </div>
      </section>
    </main>
  );
};

export default App;
