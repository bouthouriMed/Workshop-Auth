import React from "react";

import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ({ component: Component, ...rest }) {
  const isAuthentificated = useSelector(
    (state) => state.authReducer.isAuthentificated
  );
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthentificated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}
