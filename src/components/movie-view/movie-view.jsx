import React from 'react';
import { MainView } from '../main-view/main-view';
import { MovieCard } from '../movie-card/movie-card';
import { Button, Container, Row, Card, Col } from 'react-bootstrap';

import "./movie-view.scss";

export class MovieView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movie, goBack } = this.props;

    if (!movie) return null;

    return (
      <Container>
        <div className="movie-view movie-align">
          <br></br>
          <br></br>
          <Card style={{ width: '45rem' }}>
            <img className="movie-poster" src={movie.ImagePath} />
            <br></br>
            <div className="movie-title">
              <span className="label"></span>
              <span className="value">{movie.Title}</span>
            </div>
            <br></br>
            <div className="movie-description movie-align" style={{ width: '35rem' }}>
              <span className="label">Description: </span>
              <span className="value">{movie.Description}</span>
            </div>
            <br></br>
            <div className="movie-genre movie-align">
              <span className="label">Genre: </span>
              <span className="value">{movie.Genre.Name}</span>
            </div>
            <br></br>
            <div className="movie-director movie-align">
              <span className="label">Director: </span>
              <span className="value">{movie.Director.Name}</span>
            </div>
            <br></br>
            <Button onClick={goBack}>Go Back</Button>
          </Card>
        </div>
        <br></br>
        <br></br>
      </Container >
    );
  }
}