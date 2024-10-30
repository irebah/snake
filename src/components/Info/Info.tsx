import { useGameContext } from "../../context";

const Info = () => {
  const { state } = useGameContext();

  return <span>{state.score}</span>;
};

export default Info;
