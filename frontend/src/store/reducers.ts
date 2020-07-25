import { AppState, Action } from "./types";

export function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "login":
      return {
        ...state,
        loggedIn: true,
        token: action.token,
        name: action.name,
        username: action.username,
      };
    case "logout":
      return {
        ...state,
        loggedIn: false,
        token: null,
        name: null,
        username: null,
      };
  }
}
