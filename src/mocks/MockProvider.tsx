import { Dispatch, ReactNode } from "react";
import initialState from "../context/initialState";
import { Action, GameState } from "../context/types";
import { GameContext } from "../context";

const MockProvider = ({
  children,
  mockState = initialState,
  mockDispatch = vi.fn(),
}: {
  children: ReactNode;
  mockState?: GameState;
  mockDispatch?: Dispatch<Action>;
}) => {
  return (
    <GameContext.Provider value={{ state: mockState, dispatch: mockDispatch }}>
      {children}
    </GameContext.Provider>
  );
};

export default MockProvider;
