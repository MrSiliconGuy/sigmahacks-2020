import React from "react";
import AppNavBar from "./components/AppNavBar";
import UserProfileView from "./components/userprofile/UserProfileView";
import {
  useHistory,
  Switch,
  Route,
  BrowserRouter,
  Redirect,
} from "react-router-dom";
import MapView from "./components/mapview/MapView";
import SignUpView from "./components/login/SignUpView";
import LoginView from "./components/login/LoginView";
import BusinessProfileView from "./components/businessprofile/BusinessProfileView";
import HospitalProfileView from "./components/hospitalprofile/HospitalProfileView";

export default function App() {
  return (
    <div className="App">
      <AppNavBar />
      <BrowserRouter>
        <Switch>
          <Route exact path="/"></Route>
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
          <Route path="/business">
            <BusinessProfileView />
          </Route>
          <Route path="/hospital">
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
