import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Link } from "react-router-dom";
export function ProfileView(props) {
  const [username, setUsername] = useState(props.user.Username);
  const [password, setPassword] = useState(props.user.Password);
  const [email, setEmail] = useState(props.user.Email);
  const [dob, setDob] = useState(props.user.Birthday);
  const [favoritemovies, setFavoriteMovies] = useState(props.user.FavoriteMovies);
  const removeFromFavorites = (movieId) => {
    console.log(props.token)
    axios.delete(`https://mymoviepull.herokuapp.com/users/${props.user.Username}/Movies/${movieId}`, {
      headers: {
        Authorization: `Bearer ${props.token}`
      }
    })
      .then(response => {
        console.log(response)
        props.reloadUser()
      })
      .catch(function (error) {
        console.log(error);
      });
  }

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
  }; console.log(props)
  return (
    <div>
      <Form action="movieSubmit">
        <Form.Group controlId="formBasicMovieList">
          <Form.Label>Favorite Movies</Form.Label>
          {
            props.user.FavoriteMovies.map((movie, index) => {
              const favorite = props.movies.find((mv) => mv._id === movie)
              return (<div key={index}>
                {favorite ? favorite.Title : ""}
                <Button onClick={() => removeFromFavorites(movie)}>
                  Delete
                </Button>
              </div>)
            })
          }
        </Form.Group>
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
        {props.user && <Button onClick={() => this.deRegister()}>
          <b>Delete Account</b>
        </Button>}
      </Form>
    </div>
  );
}