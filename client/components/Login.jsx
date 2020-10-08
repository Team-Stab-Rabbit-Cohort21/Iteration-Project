import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

const useInput = (init) => {
  const [value, setValue] = useState(init);
  const onChange = (e) => {
    setValue(e.target.value);
  };
  return [value, onChange];
};

function Login() {
  const [email, emailOnChange] = useInput('');
  const [password, passwordOnChange] = useInput('');

  const onLoginSubmit = () => {
    alert(email);
    const body = {
      email,
      password,
    };
    console.log('login submit body is', body);

    fetch('/loginpage', {
      method: 'POST',
      // mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log('response from login POST', data);
        props.history.push('/'); // returns to path '/'
        // location.reload();
      })
      .catch((err) => console.log('Login fetch /login: ERROR: ', err));
  };
  return (
    <div className='container signup-login-container'>
      <h1>Welcome!</h1>
      {/* <Tabs defaultActiveKey='signup' id='signup-login-tab'>
        <Tab eventKey='signup' title='Sign Up'>
          <Form className='signup-login-form'>
            <Form.Group controlId='formFirstName'>
              <Form.Label>First Name</Form.Label>
              <Form.Control type='text' placeholder='Enter First Name' />
            </Form.Group>

            <Form.Group controlId='formLastName'>
              <Form.Label>Last Name</Form.Label>
              <Form.Control type='text' placeholder='Enter Last Name' />
            </Form.Group>

            <Form.Group controlId='formEmail'>
              <Form.Label>Email address</Form.Label>
              <Form.Control type='email' placeholder='Enter email' />
              <Form.Text className='text-muted'>
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId='formPassword'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' placeholder='Password' />
            </Form.Group>
            <Button variant='primary' type='submit'>
              Sign Up!
            </Button>
          </Form>
        </Tab> */}
      {/* <Tab eventKey='login' title='Log In'> */}
      <Form
        className='signup-login-form'
        // onSubmit={(e) => {
        //   e.preventDefault();
        //   onLoginSubmit();
        // }}
      >
        <Form.Group controlId='formEmail'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={emailOnChange}
          />
        </Form.Group>

        <Form.Group controlId='formPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Password'
            value={password}
            onChange={passwordOnChange}
          />
        </Form.Group>
        {/* <Button variant='primary' type='submit'> */}
        <Button variant='primary' onClick={onLoginSubmit}>
          Log In
        </Button>
      </Form>
      {/* </Tab>
      </Tabs> */}
    </div>
  );
}

// export default Login;
export default withRouter(Login);
