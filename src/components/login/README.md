# Login Component

This component can be reused across applications for authentication purposes.

## Available functionality

It performs the following functions:

* **Login of User**: This component submits the username / password of the user to the server, and receives a signed JWT (JSON Web Token) upon successful login. In case of errors, prints them out to the webpage.

* **Registration of New User**: This component submits the username / email / password of the user to the server. If the details are valid, the server registers the new user. In case of errors, prints them out to the webpage.

* **Email Validation of New User**: This component submits the validation code of the user to the server. If the details are valid, the server validates the new user. In case of errors, prints them out to the webpage.

* **Forgot Password**: If the user has forgotten their password, they can reset it here. An email will be sent with reset token and link to reset the password.

* **Rest Password**: This component submits the reset code / new password of the user to the server. If the details are valid, the server approves the new password. In case of errors, prints them out to the webpage.

## Requirements for Usage

The **Login component** isn't opinionated about how you handle the login response, it gives you the `response` object to be dealt with as per your application's needs. And it also requires the API endpoints to be specified. See below for details.

It requires 2 `props`:

1. `loginSuccessCallback`: For handling the 'response' object upon successful login.
2. `apiDetails`: An object containing below details

```js
    {
      url: 'http://www.myurl.com',
      endpoints: {
        login: '/login',
        register: '/register',
        validate: '/validate',
        forgotPassword: '/forgotpassword',
        resetPassword: '/resetpassword'
      }
    }
```

This component also requires certain classes in CSS to work. Please see [App.css](https://github.com/raravi/react-login-client/blob/master/src/App.css) in the [sample git repo](https://github.com/raravi/react-login-client) for more information regarding this!
