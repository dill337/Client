import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { Button, Container, Row, Card, Col } from 'react-bootstrap';

import { Link } from "react-router-dom";

//import "./genre-card.scss"



export class DirectorView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // send a request to the server for authentication
    axios.get('https://mymoviepull.herokuapp.com/movies/Director/')
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
  render() {
    const { movie, Director } = this.props;
    console.log(this.props);
    return (
      <Container>
        <Card style={{ width: '26rem' }}>
          {/* <Card.Img variant="top" src={movie.ImagePath} style={{ width: '140px' }} /> */}
          <br></br>
          <Card.Body>
            <Card.Title>{movie.Director.Name}</Card.Title>
            <Card.Text> {movie.Director.Bio} </Card.Text>
            <Card.Text> Born: {movie.Director.Birth}</Card.Text>
            <Card.Text>{movie.Director.Death}</Card.Text>
            <br></br>
            <br></br>
            {/* <Link to={`/movies/_id`}> */}
            <Link to={`/movies/${movie._id}`}>
              <Button variant="link">Go Back</Button>
            </Link>
            <br></br>
            <br></br>
          </Card.Body>
        </Card >
      </Container>
    );
  }
}