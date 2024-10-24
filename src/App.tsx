import { useEffect, useRef, useState } from "react";
import Board from "./components/Board/Board";
import { Position, Size } from "./types";

const App = () => {
  const gameAreaRef = useRef<HTMLDivElement | null>(null);
  const [gameAreaSize, setGameAreaSize] = useState<Size>({
    width: 0,
    height: 0,
  });

  const snake: Array<Position> = [{ x: 0, y: 0 }];
  const apple: Position = { x: 3, y: 5 };

  useEffect(() => {
    const handleResize = () => {
      if (gameAreaRef.current) {
        setGameAreaSize({
          width: gameAreaRef.current.clientWidth,
          height: gameAreaRef.current.clientHeight,
        });
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <main className="flex-col gap-4 center w-screen h-screen p-5 md:p-10">
      <p className="text-4xl">Snake</p>
      <section className="gameArea center flex-col md:flex md:flex-row gap-3 relative">
        <div
          data-testid="info-area"
          className="md:w-[250px] md:block w-full flex md:order-last mb-2 md:mb-0"
        >
          info will go here
        </div>
        <div
          ref={gameAreaRef}
          data-testid="game-area"
          className="flex-1 md:h-100 h-full w-full overflow-hidden flex justify-center items-center"
        >
          <Board size={gameAreaSize} snake={snake} apple={apple}></Board>
        </div>
      </section>
    </main>
  );
};

export default App;
