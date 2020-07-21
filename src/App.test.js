import React, { useReducer } from 'react';
import { Router } from "react-router-dom";
import { createMemoryHistory } from 'history';
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axiosMock from 'axios';
import App from './App';
import Login from './components/login';
import { apiDetails } from './config/apiDetails';
import {
  loginReducer,
  registerReducer,
  validateReducer,
  forgotPasswordReducer,
  resetPasswordReducer } from './components/login/reducers';

/**
 * Mocks of external dependencies
 */
jest.mock('axios');
console.error = jest.fn();

/**
 * Wrapper for Router
 */
function renderWithRouter(
  ui,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
  } = {}
) {
  const Wrapper = ({ children }) => (
    <Router history={history}>{children}</Router>
  );
  return {
    ...render(ui, { wrapper: Wrapper }),
    history
  };
}

let loginData = {
      url: apiDetails.url + apiDetails.endpoints.login,
      options: {"email": "", "password": ""},
      successResponse: null,
      emailError: "Email not found",
      passwordError: "Password incorrect",
      errorResponse: null
    },
    registerData = {
      createdUser: "New user registered successfully!",
      url: apiDetails.url + apiDetails.endpoints.register,
      options: {"name": "", "email": "", "password": "", "password2": ""},
      successResponse: {
        data: {
          createduser: "New user registered successfully!"
        }
      },
      nameError: "Name field is required",
      emailError: "Email already exists",
      passwordError: "Password must be at least 6 characters",
      password2Error: "Passwords must match",
      errorResponse: null
    },
    validateData = {
      url: apiDetails.url + apiDetails.endpoints.validate,
      options: {"validatecode": ""},
      successResponse: {
        data: {
          success: "Email has been successfully validated!"
        }
      },
      validationResponse: {
        data: {
          validatecode: "Validation code is required"
        }
      },
      errorResponse: { error: "Error!" }
    },
    forgotPasswordData = {
      url: apiDetails.url + apiDetails.endpoints.forgotPassword,
      options: {"email": ""},
      emailSent: 'The reset email has been sent, please check your inbox!',
      successResponse: null,
      emailError: "Email not found",
      errorResponse: null
    },
    resetPasswordData = {
      url: apiDetails.url + apiDetails.endpoints.resetPassword,
      options: {"email": "", "resetcode": "", "password": "", "password2": ""},
      emailSent: 'The reset email has been sent, please check your inbox!',
      successResponse: {
        data: {
          success: "Password changed successfully!"
        }
      },
      validationResponse: {
        data: {
          email: "Email field is required",
          resetcode: "Reset code is required",
          password: "Password field is required",
          password2: "Confirm password field is required",
        }
      },
      errorResponse: { error: "Error!" }
    };

afterEach(() => {
  axiosMock.post.mockReset();
});

afterEach(cleanup);

/**
 * LOGIN page
 */
describe('Login Page', () => {
  beforeEach(() => {
    loginData.successResponse = {
      data: {
        success: true
      }
    };
    loginData.errorResponse = {
      response: {
        status: 404,
        data: {
          email: "",
          password: ""
        }
      }
    };
  });

  it('submit button is present', () => {
    const { getByTestId } = renderWithRouter(<App />);

    expect(getByTestId('login-button')).toBeInTheDocument();
  });

  it('login: no props', async () => {
    axiosMock.post.mockResolvedValueOnce(loginData.successResponse);
    const { getByTestId } = renderWithRouter(<Login />);

    fireEvent.click(getByTestId('login-button'));

    // const appElement = await findByText("App");
    expect(axiosMock.post).toHaveBeenCalledTimes(1);
    expect(axiosMock.post).toHaveBeenCalledWith(loginData.url, loginData.options);
  });

  it('login is successful', async () => {
    axiosMock.post.mockResolvedValueOnce(loginData.successResponse);
    const { getByTestId } = renderWithRouter(<App />);

    fireEvent.click(getByTestId('login-button'));

    expect(axiosMock.post).toHaveBeenCalledTimes(1);
    expect(axiosMock.post).toHaveBeenCalledWith(loginData.url, loginData.options);
  });

  it('login error: no response.data.email', async () => {
    loginData.errorResponse.response.data.password = loginData.passwordError;
    axiosMock.post.mockImplementation(() => Promise.reject(loginData.errorResponse));
    const { getByTestId } = renderWithRouter(<App />);

    fireEvent.click(getByTestId('login-button'));

    expect(axiosMock.post).toHaveBeenCalledTimes(1);
    expect(axiosMock.post).toHaveBeenCalledWith(loginData.url, loginData.options);
  });

  it('login error: no response.data.password', async () => {
    loginData.errorResponse.response.data.email = loginData.emailError;
    axiosMock.post.mockImplementation(() => Promise.reject(loginData.errorResponse));
    const { getByTestId } = renderWithRouter(<App />);

    fireEvent.click(getByTestId('login-button'));

    expect(axiosMock.post).toHaveBeenCalledTimes(1);
    expect(axiosMock.post).toHaveBeenCalledWith(loginData.url, loginData.options);
  });

  it('login error: no error.response.data', () => {
    loginData.errorResponse.response.data = null;
    axiosMock.post.mockImplementation(() => Promise.reject(loginData.errorResponse));
    const { getByTestId } = renderWithRouter(<App />);

    fireEvent.click(getByTestId('login-button'));

    expect(axiosMock.post).toHaveBeenCalledTimes(1);
    expect(axiosMock.post).toHaveBeenCalledWith(loginData.url, loginData.options);
  });

  it('Register link is clicked', () => {
    const { getByTestId } = renderWithRouter(<App />);

    fireEvent.click(getByTestId('login-register'));

    expect(getByTestId('register-button')).toBeInTheDocument();
  });

  it('Forgot Password is clicked', () => {
    const { getByTestId } = renderWithRouter(<App />);

    fireEvent.click(getByTestId('login-forgotpassword'));

    expect(getByTestId('forgotpassword-button')).toBeInTheDocument();
  });

  describe('Test the Reducers', () => {
    let MockLogin;
    beforeAll(() => {
      MockLogin = () => {
        const [, loginDispatch] = useReducer(loginReducer, {
          emailError: '',
          passwordError: '',
        });
        const [, registerDispatch] = useReducer(registerReducer, {
          usernameError: '',
          emailError: '',
          passwordError: '',
          password2Error: '',
          success: '',
        });
        const [, validateDispatch] = useReducer(validateReducer, {
          validateCodeError: '',
          success: '',
        });
        const [, forgotPasswordDispatch] = useReducer(forgotPasswordReducer, {
          emailError: '',
          emailSuccess: '',
        });
        const [, resetPasswordDispatch] = useReducer(resetPasswordReducer, {
          emailError: '',
          resetCodeError: '',
          passwordError: '',
          password2Error: '',
          success: '',
        });
        return (
          <>
            <p
              data-testid="mock-login"
              onClick={() => loginDispatch({ type: 'dummy', text: "dummy" })}
            >
              Login
            </p>
            <p
              data-testid="mock-register"
              onClick={() => registerDispatch({ type: 'dummy', text: "dummy" })}
            >
              Register
            </p>
            <p
              data-testid="mock-validate"
              onClick={() => validateDispatch({ type: 'dummy', text: "dummy" })}
            >
              Validate
            </p>
            <p
              data-testid="mock-forgot-password"
              onClick={() => forgotPasswordDispatch({ type: 'dummy', text: "dummy" })}
            >
              Forgot Password
            </p>
            <p
              data-testid="mock-reset-password"
              onClick={() => resetPasswordDispatch({ type: 'dummy', text: "dummy" })}
            >
              Reset Password
            </p>
          </>
        )
      };
    });
    it('Login Reducer', () => {
      const { getByTestId } = render(<MockLogin />);

      try {
        fireEvent.click(getByTestId('mock-login'));
      } catch (e) {
        expect(e.toString()).toBe('Error: Unexpected action');
      }
    });

    it('Register Reducer', () => {
      const { getByTestId } = render(<MockLogin />);

      try {
        fireEvent.click(getByTestId('mock-register'));
      } catch (e) {
        expect(e.toString()).toBe('Error: Unexpected action');
      }
    });

    it('Validate Reducer', () => {
      const { getByTestId } = render(<MockLogin />);

      try {
        fireEvent.click(getByTestId('mock-validate'));
      } catch (e) {
        expect(e.toString()).toBe('Error: Unexpected action');
      }
    });

    it('Forgot Password Reducer', () => {
      const { getByTestId } = render(<MockLogin />);

      try {
        fireEvent.click(getByTestId('mock-forgot-password'));
      } catch (e) {
        expect(e.toString()).toBe('Error: Unexpected action');
      }
    });

    it('Reset Password Reducer', () => {
      const { getByTestId } = render(<MockLogin />);

      try {
        fireEvent.click(getByTestId('mock-reset-password'));
      } catch (e) {
        expect(e.toString()).toBe('Error: Unexpected action');
      }
    });
  });
});

/**
 * REGISTER page
 */
describe('Register Page', () => {
  beforeEach(() => {
    registerData.errorResponse = {
      response: {
        status: 404,
        data: {
          name: "",
          email: "",
          password: "",
          password2: "",
        }
      }
    };
  });

  it('submit button is present', () => {
    const { getByTestId } = renderWithRouter(<App />);

    fireEvent.click(getByTestId('login-register'));

    expect(getByTestId('register-button')).toBeInTheDocument();
  });

  it('Register is successful', async () => {
    axiosMock.post.mockResolvedValueOnce(registerData.successResponse);
    const { getByTestId } = renderWithRouter(<App />);
    fireEvent.click(getByTestId('login-register'));
    expect(getByTestId('register-button')).toBeInTheDocument();

    fireEvent.click(getByTestId('register-button'));

    expect(axiosMock.post).toHaveBeenCalledTimes(1);
    expect(axiosMock.post).toHaveBeenCalledWith(registerData.url, registerData.options);
  });

  it('Register error occured: only name error', async () => {
    registerData.errorResponse.response.data.name = registerData.nameError;
    axiosMock.post.mockImplementation(() => Promise.reject(registerData.errorResponse));
    const { getByTestId } = renderWithRouter(<App />);
    fireEvent.click(getByTestId('login-register'));
    expect(getByTestId('register-button')).toBeInTheDocument();

    fireEvent.click(getByTestId('register-button'));

    expect(axiosMock.post).toHaveBeenCalledTimes(1);
    expect(axiosMock.post).toHaveBeenCalledWith(registerData.url, registerData.options);
  });

  it('Register error occured: no name error', async () => {
    registerData.errorResponse.response.data.email = registerData.emailError;
    registerData.errorResponse.response.data.password = registerData.passwordError;
    registerData.errorResponse.response.data.password2 = registerData.password2Error;
    axiosMock.post.mockImplementation(() => Promise.reject(registerData.errorResponse));
    const { getByTestId } = renderWithRouter(<App />);
    fireEvent.click(getByTestId('login-register'));
    expect(getByTestId('register-button')).toBeInTheDocument();

    fireEvent.click(getByTestId('register-button'));

    expect(axiosMock.post).toHaveBeenCalledTimes(1);
    expect(axiosMock.post).toHaveBeenCalledWith(registerData.url, registerData.options);
  });

  it('Register error occured: no error.response.data', async () => {
    registerData.errorResponse.response.data = null;
    axiosMock.post.mockImplementation(() => Promise.reject(registerData.errorResponse));
    const { getByTestId } = renderWithRouter(<App />);
    fireEvent.click(getByTestId('login-register'));
    expect(getByTestId('register-button')).toBeInTheDocument();

    fireEvent.click(getByTestId('register-button'));

    expect(axiosMock.post).toHaveBeenCalledTimes(1);
    expect(axiosMock.post).toHaveBeenCalledWith(registerData.url, registerData.options);
  });

  it('Login link is clicked', () => {
    const { getByTestId } = renderWithRouter(<App />);
    fireEvent.click(getByTestId('login-register'));
    expect(getByTestId('register-button')).toBeInTheDocument();

    fireEvent.click(getByTestId('register-login'));

    expect(getByTestId('login-button')).toBeInTheDocument();
  });

});

/**
 * VALIDATE page
 */
describe('Validate Page', () => {
  it('Load VALIDATE', () => {
    // const history = createMemoryHistory();
    // const route = '/some-route';
    const { getByTestId } = renderWithRouter(<App />, {
      route: '/validate',
    });

    expect(getByTestId('validate-button')).toBeInTheDocument();
  });

  it('Validation is successful', async () => {
    fetch = jest.fn(() => Promise.resolve({ json: () => validateData.successResponse.data }));
    const { getByTestId } = renderWithRouter(<App />, {
      route: '/validate',
    });

    fireEvent.click(getByTestId('validate-button'));

    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('Validate error', async () => {
    fetch = jest.fn(() => Promise.reject(validateData.errorResponse));
    const { getByTestId } = renderWithRouter(<App />, {
      route: '/validate',
    });

    fireEvent.click(getByTestId('validate-button'));

    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('Validate error: validation errors', async () => {
    fetch = jest.fn(() => Promise.resolve({ json: () => validateData.validationResponse.data }));
    const { getByTestId } = renderWithRouter(<App />, {
      route: '/validate',
    });

    fireEvent.click(getByTestId('validate-button'));

    expect(fetch).toHaveBeenCalledTimes(1);
  });
});

/**
 * FORGOT PASSWORD page
 */
describe('Forgot Password Page', () => {
  beforeEach(() => {
    forgotPasswordData.successResponse = {
      data: {
        emailsent: null,
      }
    };
    forgotPasswordData.errorResponse = {
      response: {
        status: 404,
        data: {
          email: ""
        }
      }
    };
  });

  it('submit button is present', () => {
    const { getByTestId } = renderWithRouter(<App />);

    fireEvent.click(getByTestId('login-forgotpassword'));

    expect(getByTestId('forgotpassword-button')).toBeInTheDocument();
  });

  it('Forgot Password is successful', async () => {
    forgotPasswordData.successResponse.data.emailsent = forgotPasswordData.emailSent;
    axiosMock.post.mockResolvedValueOnce(forgotPasswordData.successResponse);
    const { getByTestId } = renderWithRouter(<App />);
    fireEvent.click(getByTestId('login-forgotpassword'));
    expect(getByTestId('forgotpassword-button')).toBeInTheDocument();

    fireEvent.click(getByTestId('forgotpassword-button'));

    expect(axiosMock.post).toHaveBeenCalledTimes(1);
    expect(axiosMock.post).toHaveBeenCalledWith(forgotPasswordData.url, forgotPasswordData.options);
  });

  it('Forgot Password is successful: no response.data.emailsent', async () => {
    axiosMock.post.mockResolvedValueOnce(forgotPasswordData.successResponse);
    const { getByTestId } = renderWithRouter(<App />);
    fireEvent.click(getByTestId('login-forgotpassword'));
    expect(getByTestId('forgotpassword-button')).toBeInTheDocument();

    fireEvent.click(getByTestId('forgotpassword-button'));

    expect(axiosMock.post).toHaveBeenCalledTimes(1);
    expect(axiosMock.post).toHaveBeenCalledWith(forgotPasswordData.url, forgotPasswordData.options);
  });

  it('Forgot Password error', async () => {
    forgotPasswordData.errorResponse.response.data.email = forgotPasswordData.emailError;
    axiosMock.post.mockImplementation(() => Promise.reject(forgotPasswordData.errorResponse));
    const { getByTestId } = renderWithRouter(<App />);
    fireEvent.click(getByTestId('login-forgotpassword'));
    expect(getByTestId('forgotpassword-button')).toBeInTheDocument();

    fireEvent.click(getByTestId('forgotpassword-button'));

    expect(axiosMock.post).toHaveBeenCalledTimes(1);
    expect(axiosMock.post).toHaveBeenCalledWith(forgotPasswordData.url, forgotPasswordData.options);
  });

  it('Forgot Password error: no error.response.data', async () => {
    forgotPasswordData.errorResponse.response.data = null;
    axiosMock.post.mockImplementation(() => Promise.reject(forgotPasswordData.errorResponse));
    const { getByTestId } = renderWithRouter(<App />);
    fireEvent.click(getByTestId('login-forgotpassword'));
    expect(getByTestId('forgotpassword-button')).toBeInTheDocument();

    fireEvent.click(getByTestId('forgotpassword-button'));

    expect(axiosMock.post).toHaveBeenCalledTimes(1);
    expect(axiosMock.post).toHaveBeenCalledWith(forgotPasswordData.url, forgotPasswordData.options);
  });
});

/**
 * RESET PASSWORD page
 */
describe('Reset Password Page', () => {
  it('Load RESET PASSWORD', () => {
    // const history = createMemoryHistory();
    // const route = '/some-route';
    const { getByTestId } = renderWithRouter(<App />, {
      route: '/reset-password',
    });

    expect(getByTestId('resetpassword-button')).toBeInTheDocument();
  });

  it('Reset Password is successful', async () => {
    fetch = jest.fn(() => Promise.resolve({ json: () => resetPasswordData.successResponse.data }));
    const { getByTestId } = renderWithRouter(<App />, {
      route: '/reset-password',
    });

    fireEvent.click(getByTestId('resetpassword-button'));

    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('Reset Password error', async () => {
    fetch = jest.fn(() => Promise.reject(resetPasswordData.errorResponse));
    const { getByTestId } = renderWithRouter(<App />, {
      route: '/reset-password',
    });

    fireEvent.click(getByTestId('resetpassword-button'));

    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('Reset Password error: validation errors', async () => {
    fetch = jest.fn(() => Promise.resolve({ json: () => resetPasswordData.validationResponse.data }));
    const { getByTestId } = renderWithRouter(<App />, {
      route: '/reset-password',
    });

    fireEvent.click(getByTestId('resetpassword-button'));

    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
