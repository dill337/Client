import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { LoginView } from '../login-view/login-view';

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
    <form>
      <div>
        <label>
          Username:
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Password:
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Email:
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Dob:
        <input type="dob" value={dob} onChange={e => setDob(e.target.value)} />
        </label>
      </div>
      <Button type="button" onClick={handleSubmit}>Submit</Button>
      <Button type="button" onClick={noRegister}>Go Back</Button>
    </form>
  );
}
