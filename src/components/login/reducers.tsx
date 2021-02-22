/**
 * Reducers for maintaining the state of
 * 1. Login page,
 * 2. Register page &
 * 3. Forgot password page.
 */
const loginReducer = (state: LoginState, action: Action): LoginState => {
  switch (action.type) {
    case 'email-error':
      return { ...state, emailError: (action as ActionWithText).text };
    case 'password-error':
      return { ...state, passwordError: (action as ActionWithText).text };
    case 'reset-all':
      return {
        ...state,
        emailError: '',
        passwordError: ''
      };
    default:
      throw new Error('Unexpected action');
  }
};

const registerReducer = (state: RegisterState, action: Action) => {
  switch (action.type) {
    case 'username-error':
      return { ...state, usernameError: (action as ActionWithText).text };
    case 'email-error':
      return { ...state, emailError: (action as ActionWithText).text };
    case 'password-error':
      return { ...state, passwordError: (action as ActionWithText).text };
    case 'password2-error':
      return { ...state, password2Error: (action as ActionWithText).text };
    case 'success':
      return { ...state, success: (action as ActionWithText).text };
    case 'reset-all':
      return {
        ...state,
        usernameError: '',
        emailError: '',
        passwordError: '',
        password2Error: '',
        success: ''
      };
    default:
      throw new Error('Unexpected action');
  }
};

const validateReducer = (state: ValidateState, action: Action) => {
  switch (action.type) {
    case 'validate-code-error':
      return { ...state, validateCodeError: (action as ActionWithText).text };
    case 'success':
      return { ...state, success: (action as ActionWithText).text };
    case 'reset-all':
      return {
        ...state,
        validateCodeError: '',
        success: ''
      };
    default:
      throw new Error('Unexpected action');
  }
};

const forgotPasswordReducer = (state: ForgotPasswordState, action: Action) => {
  switch (action.type) {
    case 'email-error':
      return { ...state, emailError: (action as ActionWithText).text };
    case 'email-success':
      return { ...state, emailSuccess: (action as ActionWithText).text };
    case 'reset-all':
      return {
        ...state,
        emailError: '',
        emailSuccess: ''
      };
    default:
      throw new Error('Unexpected action');
  }
};

const resetPasswordReducer = (state: ResetPasswordState, action: Action) => {
  switch (action.type) {
    case 'email-error':
      return { ...state, emailError: (action as ActionWithText).text };
    case 'reset-code-error':
      return { ...state, resetCodeError: (action as ActionWithText).text };
    case 'password-error':
      return { ...state, passwordError: (action as ActionWithText).text };
    case 'password2-error':
      return { ...state, password2Error: (action as ActionWithText).text };
    case 'success':
      return { ...state, success: (action as ActionWithText).text };
    case 'reset-all':
      return {
        ...state,
        emailError: '',
        resetCodeError: '',
        passwordError: '',
        password2Error: '',
        success: ''
      };
    default:
      throw new Error('Unexpected action');
  }
};

export {
  loginReducer,
  registerReducer,
  validateReducer,
  forgotPasswordReducer,
  resetPasswordReducer
};
