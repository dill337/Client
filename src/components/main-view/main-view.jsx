import React from 'react';
import axios from 'axios';

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

import {
  Button,
  Container,
  Row,
  Col,
} from 'react-bootstrap';

export class MainView extends React.Component {
  //one of the "hooks" available in a react component 
  // initialize the state to empty object so we can destructure it later
  constructor() {
    // call the superclass instructor so react can initialize it
    super();
    this.state = {
      register: false,
      movies: null,
      selectedMovie: null,
      user: null
    };
  }
  componentDidMount() {
    axios.get('https://mymoviepull.herokuapp.com/movies')
      .then(response => {
        //assign the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }
  onRegister(user) {
    this.setState({
      user
    });
  }
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }
  getMovies(token) {
    axios.get('https://mymoviepull.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  onRegisterClick = () => {
    this.setState({
      register: true
    });
  }
  notLogged = () => {
    this.setState({
      user: false, register: false
    });
  }
  render() {
    //if the state isn't initialized, ths will throw on runtime
    //befor the datq is initially loaded
    const { movies, selectedMovie, user, register } = this.state;

    if (!user && !register) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} onRegisterClick={this.onRegisterClick} />;
    //before the movies have been loaded
    if (!user && register) return <RegistrationView onLoggedIn={user => this.onLoggedIn(user)} notLogged={this.notLogged} />
    if (!movies) return <div className="main-view" />;
    return (
      <div className="main-view">
        {selectedMovie
          ? <MovieView movie={selectedMovie} goBack={() => this.onMovieClick(undefined)} />
          : <div className="row">
            {
              movies.map((movie) => {
                return <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)} />

              })
            }
          </div>
        }
      </div>
    );
  }
}