import React, { useState } from 'react';

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
      <button type="button" onClick={handleSubmit}>Submit</button>
      <button type="button" onClick={noRegister}>Go Back</button>
    </form>
  );
}
