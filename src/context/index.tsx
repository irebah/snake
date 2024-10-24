"use client";

import { createContext, ReactNode, useContext, useReducer } from "react";
import { GameContextType } from "./types";
import initialState from "./initialState";
import reducer from "./reducer";

export const GameContext = createContext<GameContextType | undefined>(
  undefined
);

export const GameProvider = ({
  children,
}: {
  children: ReactNode;
}): ReactNode => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
};
