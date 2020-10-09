import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import { connect } from 'react-redux';

const mapStateToProps = ({ informationReducer: { user, favorites } }) => ({
  user,
  favorites,
});

const useInput = (init) => {
  const [value, setValue] = useState(init);
  const onChange = (e) => {
    setValue(e.target.value);
  };
  return [value, onChange];
};

const Login = (props) => {
  const [email, emailOnChange] = useInput('');
  const [password, passwordOnChange] = useInput('');
  const [first_name, first_nameOnChange] = useInput('');
  const [last_name, last_nameOnChange] = useInput('');
  const [location, locationOnChange] = useInput('');

  const onSignUpSubmit = () => {
    const body = {
      email,
      password,
      first_name,
      last_name,
      location,
    };
    console.log('login submit body is', body);

    fetch('/loginpage/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log('response from login POST', data);
        props.history.push('/');
      })
      .catch((err) => console.log('Login fetch /login: ERROR: ', err));
  };

  const onLoginSubmit = () => {
    const body = {
      email,
      password,
    };
    console.log('login submit body is', body);

    fetch('/loginpage/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log('response from login POST', data);
        props.history.push('/');
      })
      .catch((err) => console.log('Login fetch /login: ERROR: ', err));
  };
  return (
    <div className="container signup-login-container">
      <h1>Welcome!</h1>
      <Tabs defaultActiveKey="login" id="signup-login-tab">
        <Tab eventKey="signup" title="Sign Up">
          <Form className="signup-login-form">
            <Form.Group controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter First Name"
                value={first_name}
                onChange={first_nameOnChange}
              />
            </Form.Group>

            <Form.Group controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Last Name"
                value={last_name}
                onChange={last_nameOnChange}
              />
            </Form.Group>

            <Form.Group controlId="formLocation">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Location"
                value={location}
                onChange={locationOnChange}
              />
            </Form.Group>

            <Form.Group controlId="formEmail1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={emailOnChange}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formPassword1">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={passwordOnChange}
              />
            </Form.Group>
            {/* <Button variant="primary" type="submit"> */}
            <Button variant="primary" onClick={onSignUpSubmit}>
              Sign Up!
            </Button>
          </Form>
        </Tab>
        <Tab eventKey="login" title="Log In">
          <Form className="signup-login-form">
            <Form.Group controlId="formEmail2">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={emailOnChange}
              />
            </Form.Group>

            <Form.Group controlId="formPassword2">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={passwordOnChange}
              />
            </Form.Group>
            {/* <Button variant='primary' type='submit'> */}
            <Button variant="primary" onClick={onLoginSubmit}>
              Log In
            </Button>
          </Form>
        </Tab>
      </Tabs>
    </div>
  );
};

// export default Login;
// export default withRouter(Login);
export default withRouter(connect(mapStateToProps, null)(Login));
