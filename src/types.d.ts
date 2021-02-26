type LoginComponentProps = {
  loginSuccessCallback: (response: any) => void,
  apiDetails: {
    url: string,
    endpoints: {
      login: string,
      register: string,
      validate: string,
      forgotPassword: string,
      resetPassword: string
    }
  }
};

type ActionWithText = {
  type: string,
  text: string
};

type ActionWithoutText = {
  type: string
};

type Action = ActionWithText | ActionWithoutText;

type LoginState = {
  emailError: string,
  passwordError: string,
};

type RegisterState = {
  usernameError: string,
  emailError: string,
  passwordError: string,
  password2Error: string,
  success: string,
};

type ValidateState = {
  validateCodeError: string,
  success: string,
};

type ForgotPasswordState = {
  emailError: string,
  emailSuccess: string,
};

type ResetPasswordState = {
  emailError: string,
  resetCodeError: string,
  passwordError: string,
  password2Error: string,
  success: string,
};
