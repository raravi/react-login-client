import React from 'react';
import {
  Switch,
  Route
} from "react-router-dom";
import Login from '@bit/raravi.react.login';
import './App.css';

function App() {
  const apiDetails = {
    url: 'http://localhost:8000',
    endpoints: {
      login: '/api/users/login',
      register: '/api/users/register',
      forgotPassword: '/api/users/forgotpassword',
      resetPassword: '/api/users/resetpassword'
    }
  };

  function onSuccessfulLogin(response) {
    console.log("Response: ", response);
  }

  return (
    <Switch>
      <Route path="/app">
        <p>App</p>
      </Route>
      <Route path="/">
        <Login
          loginSuccessCallback={onSuccessfulLogin}
          apiDetails={apiDetails} />
      </Route>
    </Switch>
  );
}

export default App;
