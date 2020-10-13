import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { LoginView } from '../login-view/login-view';
import "./registration-view.scss"

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, dob);
    // send a request to the server for authentication 
    props.onLoggedIn(username)
  };

  const noRegister = (e) => {
    e.preventDefault();
    console.log('go back')
    props.notLogged()
  }


  return (
    <Form>
      <Form.Group controlId="formBasicUsername">
        <Form.Label>Enter New Username</Form.Label>
        <Form.Control type="text" placeholder="New Username" value={username} onChange={e => setUsername(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Enter New Password</Form.Label>
        <Form.Control type="text" placeholder="New Password" value={password} onChange={e => setUsername(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Enter User Email</Form.Label>
        <Form.Control type="text" placeholder="User Email" value={email} onChange={e => setEmail(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="formBasicDateOfBirth">
        <Form.Label>Enter Date of Birth</Form.Label>
        <Form.Control type="date" value={dob} onChange={e => setDob(e.target.value)} />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleSubmit}>Register</Button>
      <Button variant="secondary" type="button" onClick={noRegister}>Go Back</Button>
    </Form>
  );
}
