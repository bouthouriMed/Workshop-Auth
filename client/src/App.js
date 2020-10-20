import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Login from "./components/auth/Login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { loadUser } from "./redux/actions/authActions";

import Register from "./components/auth/Register";
import Navbar from "./components/layout/Navbar";
import PrivateRoute from "./routing/PrivateRoute";

import "bootstrap/dist/css/bootstrap.css";

import "./App.css";
import Dashboard from "./components/dashboard/Dashboard";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, []);
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
