import React from 'react';
import { LoginContextProvider } from './context';
import { LoginPage } from './LoginPage';

/**
 * Login Component: Can be reused across applications.
 *
 * It requires 2 props:
 * 1. loginSuccessCallback: For handling
 *    the 'response' object upon successful login.
 * 2. apiDetails: An object containing below details
 *    {
 *      url: 'http://www.url.com',
 *      endpoints: {
 *        login: '/login',
 *        register: '/register',
 *        forgotPassword: '/forgotpassword'
 *      }
 *    }
 */
const Login = (props) => {
  return (
    <LoginContextProvider>
      <LoginPage
        loginSuccessCallback={props.loginSuccessCallback}
        apiDetails={props.apiDetails} />
    </LoginContextProvider>
  )
}

// Set default props
Login.defaultProps = {
  loginSuccessCallback: (response) => {console.log("Response: ", response)},
  apiDetails: {
    url: 'http://localhost:8000',
    endpoints: {
      login: '/api/users/login',
      register: '/api/users/register',
      forgotPassword: '/api/users/forgotpassword',
      resetPassword: '/api/users/resetpassword'
    }
  }
};

export default Login;
