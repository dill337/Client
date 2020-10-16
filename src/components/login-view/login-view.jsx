import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { Link } from "react-router-dom";


export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // send a request to the server for authentication
    axios.post('https://mymoviepull.herokuapp.com/login', {
      Username: username,
      Password: password,
    })
      .then(response => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch(e => {
        console.log('no such user')
      })
  };

  return (
    <Form>
      <Form.Group controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="Enter Username" value={username} onChange={e => setUsername(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Enter Password" value={password} onChange={e => setPassword(e.target.value)} />
      </Form.Group>
      <div>
        {/* <Link to={`/movies`}> */}
        {/* <Button onClick={() => onClick(movie)} variant="link">Log In</Button> */}
        <Button type="button" onClick={handleSubmit}>Login</Button>
        {/* </Link> */}
        {/* <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button> */}
        <Link to={`/register`}>
          <Button variant="link">New User</Button>
          {/* <Button variant="link" type="button" onClick={props.onRegisterClick}>New User</Button> */}
        </Link>
      </div>
    </Form>
  );
}
