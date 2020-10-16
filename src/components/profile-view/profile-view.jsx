import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { LoginView } from '../login-view/login-view';

import { Link } from "react-router-dom";



export function ProfileView(props) {
  const user = JSON.parse(localStorage.getItem('user'))
  const [username, setUsername] = useState(user.Username);
  const [password, setPassword] = useState(user.Password);
  const [email, setEmail] = useState(user.Email);
  const [dob, setDob] = useState(user.Birthday);


  const handleSubmit = (e) => {
    e.preventDefault();
    // send a request to the server for authentication
    axios.put('https://mymoviepull.herokuapp.com/users', {
      Username: username,
      Password: password,
      Email: email,
      Birthday: dob
    })
      .then(response => {
        const data = response.data;
        localStorage.setItem('user', JSON.stringify(data));
        console.log(data);
        window.open('/', '_self'); //lets page open in the current tab
      })
      .catch(e => {
        console.log('error updating user')
      })
  };



  return (
    <Form>
      <Form.Group controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Enter New Password</Form.Label>
        <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Enter User Email</Form.Label>
        <Form.Control type="text" value={email} onChange={e => setEmail(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="formBasicDateOfBirth">
        <Form.Label>Enter Date of Birth</Form.Label>
        <Form.Control type="text" value={new Date(dob).toString()} onChange={e => setDob(e.target.value)} />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleSubmit}>Update</Button>
      <Link to={`/`}>
        <Button /*onClick={() => onClick(movie)} */ variant="link">Go Back</Button>
      </Link>
    </Form>
  );
}
