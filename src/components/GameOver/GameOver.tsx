import StartButton from "../Button/StartButton";

const GameOver = () => {
  return (
    <div className="bg-gray-400/60 z-10 h-full w-full absolute rounded-xl border-4 flex flex-col gap-10 justify-center items-center text-4xl">
      <span>Game over</span>
      <StartButton text="Try again" />
    </div>
  );
};

export default GameOver;
