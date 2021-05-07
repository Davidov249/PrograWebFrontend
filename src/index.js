import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import Login from "./Components/Login";
import Registro from "./Components/Registro";
import Header from "./Components/Header";
import Main from "./Components/Main"
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom"
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap/dist/js/bootstrap.js";
import "./index.css"
import Playlist from './Components/Playlist';

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
  </Switch>
</Router>,
 document.getElementById("root"));

reportWebVitals();