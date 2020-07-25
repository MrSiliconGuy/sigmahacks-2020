import React, { useEffect, useState } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import AppNavBar from "./components/AppNavBar";
import BusinessProfileView from "./components/businessprofile/BusinessProfileView";
import HomepageView from "./components/homepage/HomepageView";
import HospitalProfileView from "./components/hospitalprofile/HospitalProfileView";
import LoginView from "./components/login/LoginView";
import SignUpView from "./components/login/SignUpView";
import MapView from "./components/mapview/MapView";
import UserProfileView from "./components/userprofile/UserProfileView";
import { useStore } from "./store";
import { AppState } from "./store/types";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [state, dispatch] = useStore();

  useEffect(() => {
    const str = window.localStorage.getItem("app-state");
    if (str) {
      const state = JSON.parse(str) as AppState;
      dispatch({
        type: "set-state",
        state,
      });
    }
    setLoaded(true);
  }, []);
  useEffect(() => {
    if (loaded) window.localStorage.setItem("app-state", JSON.stringify(state));
  }, [state]);
  return (
    <div className="App">
      <BrowserRouter>
        <AppNavBar />
        <Switch>
          <Route exact path="/">
            <HomepageView />
          </Route>
          <Route path="/login">
            <LoginView />
          </Route>
          <Route path="/signup">
            <SignUpView />
          </Route>
          <Route path="/map">
            <MapView />
          </Route>
          <Route path="/user">
            <UserProfileView />
          </Route>
          <Route path="/business/:id">
            <BusinessProfileView />
          </Route>
          <Route path="/hospital/:id">
            <HospitalProfileView />
          </Route>
          <Route path="/">
            <Redirect to="/" />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}
