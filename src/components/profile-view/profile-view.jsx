import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';


import { LoginView } from '../login-view/login-view';

import { Link } from "react-router-dom";



export function ProfileView(props) {
  const user = JSON.parse(localStorage.getItem('user'))
  const [username, setUsername] = useState(user.Username);
  const [password, setPassword] = useState(user.Password);
  const [email, setEmail] = useState(user.Email);
  const [dob, setDob] = useState(user.Birthday);
  const [favoritemovies, setFavoriteMovies] = useState(user.FavoriteMovies);



  const movieSubmit = (e) => {
    e.preventDefault();
    axios.put(`https://mymoviepull.herokuapp.com/users/${username}/Movies/${favoritemovies}`, {
    }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      .then(response => {
        const data = response.data;
        console.log(data);
        alert('User Successfully Updated Favorite Movies')
      })
      .catch(e => {
        console.log('error updating movies')
      })
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // send a request to the server for authentication
    axios.put(`https://mymoviepull.herokuapp.com/users/${username}`, {
      Username: username,
      Password: password,
      Email: email,
      Birthday: dob
    }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      .then(response => {
        const data = response.data;
        localStorage.setItem('user', JSON.stringify(data));
        console.log(data);
        alert('User Successfully Updated')
        //window.open('/profile', '_self'); //lets page open in the current tab
      })
      .catch(e => {
        console.log('error updating user')
      })
  };



  return (
    <div>
      <Form action="movieSubmit">
        <Form.Group controlId="formBasicMovieList">
          <Form.Label>Favorite Movies</Form.Label>
          {
            user.FavoriteMovies.map((movie) => {
              const favorite = props.movies.find((mv) => mv._id === movie)
              return (<div>
                {favorite.Title}
              </div>)
            })
          }
          {/* <Form.Control type="text" value={favoritemovies} onChange={e => setFavoriteMovies(e.target.value)} /> */}
        </Form.Group>
        {user && <Button onClick={movieSubmit}>
          <b>Update Favorite Movies</b>
        </Button>}
      </Form>
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
        {user && <Button onClick={() => this.deRegister()}>
          <b>Delete Account</b>
        </Button>}
      </Form>
    </div>
  );
}
