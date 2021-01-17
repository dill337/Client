import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import { Button, Container, Row, Card, Col } from 'react-bootstrap';

import { Link } from "react-router-dom";


export class GenreView extends React.Component {

  render() {
    const { movie, onClick } = this.props;
    console.log(this.props);
    return (
      <Container>
        <Card style={{ width: '16rem' }}>
          <br></br>
          <Card.Body>
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