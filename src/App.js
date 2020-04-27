import React, { useState } from 'react';
import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { apiDetails } from './config/apiDetails';
// import Login from '@bit/raravi.react.login';
import Login from './components/login';
import './App.css';

function App() {
  let [ userAuthenticated, setUserAuthenticated ] = useState(false);

  function onSuccessfulLogin(response) {
    console.log("Response: ", response);
    setUserAuthenticated(true);
  }

  return (
    <Switch>
      <Route path="/app">
        { userAuthenticated
          ? <p>App</p>
          : <Redirect to="/" />
        }
      </Route>
      <Route path="/">
        { userAuthenticated
          ? <Redirect to="/app" />
          : <Login
              loginSuccessCallback={onSuccessfulLogin}
              apiDetails={apiDetails} />
        }
      </Route>
    </Switch>
  );
}

export default App;
