export type AppState = {
  loggedIn: boolean;
  token: string | null;
  name: string | null;
  username: string | null;
};

export type Action = LoginAction | LogoutAction;

export type LoginAction = {
  type: "login";
  token: string;
  name: string;
  username: string;
};
export type LogoutAction = {
  type: "logout";
};

export const defaultAppState: AppState = {
  loggedIn: false,
  token: null,
  name: null,
  username: null,
};
