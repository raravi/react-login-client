import React, { createContext, useContext, useReducer } from 'react';
import {
  loginReducer,
  registerReducer,
  validateReducer,
  forgotPasswordReducer,
  resetPasswordReducer
} from './reducers';

type LoginContextProviderProps = {
  children: React.ReactElement
};

const LoginContext = createContext({
  loginState: {
    emailError: '',
    passwordError: '',
  }, 
  loginDispatch: (action: Action) => {},
  registerState: {
    usernameError: '',
    emailError: '',
    passwordError: '',
    password2Error: '',
    success: '',
  },
  registerDispatch: (action: Action) => {},
  validateState: {
    validateCodeError: '',
    success: '',
  },
  validateDispatch: (action: Action) => {},
  forgotPasswordState: {
    emailError: '',
    emailSuccess: '',
  },
  forgotPasswordDispatch: (action: Action) => {},
  resetPasswordState: {
    emailError: '',
    resetCodeError: '',
    passwordError: '',
    password2Error: '',
    success: '',
  },
  resetPasswordDispatch: (action: Action) => {},
});

export const LoginContextProvider = ({ children }: LoginContextProviderProps) => {
  const [loginState, loginDispatch] = useReducer(loginReducer, {
    emailError: '',
    passwordError: '',
  });
  const [registerState, registerDispatch] = useReducer(registerReducer, {
    usernameError: '',
    emailError: '',
    passwordError: '',
    password2Error: '',
    success: '',
  });
  const [validateState, validateDispatch] = useReducer(validateReducer, {
    validateCodeError: '',
    success: '',
  });
  const [forgotPasswordState, forgotPasswordDispatch] = useReducer(forgotPasswordReducer, {
    emailError: '',
    emailSuccess: '',
  });
  const [resetPasswordState, resetPasswordDispatch] = useReducer(resetPasswordReducer, {
    emailError: '',
    resetCodeError: '',
    passwordError: '',
    password2Error: '',
    success: '',
  });

  return (
    <LoginContext.Provider value={
      {
        loginState, loginDispatch,
        registerState, registerDispatch,
        validateState, validateDispatch,
        forgotPasswordState, forgotPasswordDispatch,
        resetPasswordState, resetPasswordDispatch
      }
    }>
      {children}
    </LoginContext.Provider>
  );
};

export const useLoginContext = () => useContext(LoginContext);
