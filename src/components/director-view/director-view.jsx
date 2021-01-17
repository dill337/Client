import React from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Card } from 'react-bootstrap';
import { Link } from "react-router-dom";

export class DirectorView extends React.Component {

  render() {
    const { movie, onClick } = this.props;
    console.log(this.props);
    return (
      <Container>
        <Card style={{ width: '26rem' }}>
          <br></br>
          <Card.Body>
            <Card.Title>{movie.Director.Name}</Card.Title>
            <Card.Text> {movie.Director.Bio} </Card.Text>
            <Card.Text> Born: {movie.Director.Birth}</Card.Text>
            <Card.Text>{movie.Director.Death}</Card.Text>
            <br></br>
            <br></br>
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

DirectorView.propTypes = {
  director: PropTypes.exact({
    _id: PropTypes.string,
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    Birth: PropTypes.string,
  }).isRequired,
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      Title: PropTypes.string,
      ImageUrl: PropTypes.string,
      Description: PropTypes.string,
      Genre: PropTypes.shape({
        _id: PropTypes.string,
        Name: PropTypes.string,
        Description: PropTypes.string
      })
    })
  ),
}