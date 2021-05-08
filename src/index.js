import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import Login from "./Components/Login";
import Registro from "./Components/Registro";
import Main from "./Components/Main";
import Song from "./Components/Song";
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap/dist/js/bootstrap.js";
import "./index.css";
import Playlist from './Components/Playlist';
import Amplify from 'aws-amplify';
import CognitoConfig from "../src/config.json";
Amplify.configure(CognitoConfig)
console.log(CognitoConfig)
ReactDOM.render(            
<Router>
  <Switch>
    <Route exact path={["/", "/playlist"]}>
      <Main>
        <Playlist />
      </Main>
    </Route>
    <Route exact path="/login">
      <Login />
    </Route>
    <Route exact path="/signup">
      <Registro />
    </Route>
    <Route exact path="/addsong">
      <Main>
        <Song />
      </Main>
    </Route>
  </Switch>
</Router>,
 document.getElementById("root"));

reportWebVitals();