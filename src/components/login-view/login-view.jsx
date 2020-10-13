import React, { useState } from 'react';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    // send a request to the server for authentication
    props.onLoggedIn(username)
  };

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
        <button type="button" onClick={handleSubmit}>Submit</button>
        <button type="button" onClick={props.onRegisterClick}>New User</button>
      </div>
    </form>
  );
}
