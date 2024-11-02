import { useGameContext } from "../../context";

const Info = () => {
  const { state } = useGameContext();

  return (
    <section className="flex md:flex-col justify-evenly w-full text-gray-500 text-5xl md:text-6xl md:gap-20">
      <article className="flex flex-col items-center md:items-start">
        <p className="text-2xl">Current score</p>
        <p data-testid="current-score">{state.score}</p>
      </article>
      <article className="flex flex-col items-center md:items-start">
        <p className="text-2xl">Highest score</p>
        <p data-testid="highest-score">{state.highestScore}</p>
      </article>
    </section>
  );
};

export default Info;
