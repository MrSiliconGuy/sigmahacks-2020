import { createStore } from "its-not-redux";
import { reducer } from "./reducers";
import { defaultAppState } from "./types";

export const { useStore, StateProvider } = createStore(
  reducer,
  defaultAppState
);

