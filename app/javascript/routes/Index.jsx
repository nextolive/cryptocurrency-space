import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Login from "../components/Login";
import Logout from "../components/Logout";
import Register from "../components/Register";
import NewShitCoin from "../components/Shitcoin";


export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/Logout" exact component={Logout} />
      <Route path="/Login" exact component={Login} />
      <Route path="/Register" exact component={Register} />
      <Route path="/shitcoin_create" exact component={NewShitCoin} /> 
      <Route path="/shitcoin_create/:id" exact component={NewShitCoin} />     
    </Switch>
  </Router>
);