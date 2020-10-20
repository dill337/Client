import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import { Button, Container, Row, Card, Col } from 'react-bootstrap';

import { Link } from "react-router-dom";

//import "./genre-card.scss"



export class GenreView extends React.Component {

  /* handleSubmit = (e) => {
     e.preventDefault();
     // send a request to the server for authentication
     axios.get('https://mymoviepull.herokuapp.com/genre/')
       //axios.get(`https://mymoviepull.herokuapp.com/movies/${movie.Name}/genre`)
       .then(response => {
         const data = response.data;
         localStorage.setItem('user', JSON.stringify(data));
         console.log(data);
         console.log('helklo')
         window.open('/', '_self'); //lets page open in the current tab
       })
       .catch(e => {
         console.log('error updating user')
       })
   };*/
  render() {
    const { movie, onClick } = this.props;
    console.log(this.props);
    return (
      <Container>
        <Card style={{ width: '16rem' }}>
          {/* <Card.Img variant="top" src={movie.ImagePath} style={{ width: '140px' }} /> */}
          <br></br>
          <Card.Body>
            {/* <Card.Title>{`/movies/genre/${Genre}`} </Card.Title> */}
            {/* <Card.Title>{movie.Genre.Name}</Card.Title> */}
            <Card.Text>{movie.Genre.Description}</Card.Text>
            <Link to={`/movies/${movie._id}`}>
              <Button variant="link">Go Back</Button>
            </Link>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
          </Card.Body>
        </Card >
      </Container>
    );
  }
}