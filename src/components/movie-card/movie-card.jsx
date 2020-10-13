import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';

import "./movie-card.scss"

export class MovieCard extends React.Component {
  render() {
    const { movie, onClick } = this.props;

    return (
      <Card style={{ width: '16rem' }}>
        <Card.Img variant="top" src={movie.ImagePath} style={{ width: '140px' }} />
        <br></br>
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Button onClick={() => onClick(movie)} variant="link">Read More</Button>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
        </Card.Body>
      </Card>
    );
  }
}
MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  }).isRequired,
  onClick: PropTypes.func.isRequired
};