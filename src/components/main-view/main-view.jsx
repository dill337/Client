import React from 'react';
import axios from 'axios';


import { BrowserRouter as Router, Route, Link } from "react-router-dom";


import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { ProfileView } from '../profile-view/profile-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';


import { Button } from 'react-bootstrap';

import "./main-view.scss"


export class MainView extends React.Component {
  //one of the "hooks" available in a react component 
  // initialize the state to empty object so we can destructure it later
  constructor() {
    // call the superclass instructor so react can initialize it
    super();
    this.state = {
      register: false,
      movies: [],
      selectedMovie: null,
      user: null
    };
  }
  componentDidMount = () => {
    //componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: JSON.parse(localStorage.getItem('user')),

        token: accessToken
      });
      this.getMovies(accessToken);
    }
  }
  onLoggedIn = (authData) => {
    //onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user
    });
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', JSON.stringify(authData.user));
    this.getMovies(authData.token);
  }
  getMovies = (token) => {
    //getMovies(token) {
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

  onMovieClick = (movie) => {
    //onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }
  onRegister = (user) => {
    this.setState({
      user
    });
  }
  onLoggedOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null,
    });
    window.open('/', '_self');
  }
  reloadUser = () => {
    axios.get(`https://mymoviepull.herokuapp.com/users/${this.state.user.Username}`, {
      headers: { Authorization: `Bearer ${this.state.token}` }
    })
      .then(response => {
        this.setState({
          user: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onUpdate = (token) => {
    axios.put('https://mymoviepull.herokuapp.com/users/:Username', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.setState({
          userUpdated: true
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  deRegister = () => {
    this.setState({
      register: false
    })
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
    const { movies, selectedMovie, user, register, token } = this.state;

    //if (!user && !register) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} onRegisterClick={this.onRegisterClick} />;
    //before the movies have been loaded
    //if (!user && register) return <RegistrationView onLoggedIn={user => this.onLoggedIn(user)} notLogged={this.notLogged} />
    //if (!movies) return <div className="main-view" />;
    return (
      <Router>
        <div className="main-view">
          <Route
            exact
            path="/"
            render={() => {
              if (!user)
                return (
                  <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                );
              //return <MoviesList movies={movies} />;
              return <div className="row">
                {
                  user && <Link to={`/profile`}>
                    <Button className="button" variant="link">Profile</Button>
                  </Link>
                }
                {movies.map(m => <MovieCard onClick={this.onMovieClick} key={m._id} movie={m} />)}
                {/* {movies.map(m => <MovieCard key={m._id} movie={m} />)} */}
              </div>

            }}
          />
          <Route exact path="/profile" render={() => <ProfileView user={user} movies={movies} token={token} reloadUser={this.reloadUser} />} />



          <Route path="/register" render={() => <RegistrationView onRegister={this.onRegister} />} />
          <Route
            exact
            path="/movies/:movieId"
            render={({ match }) => (
              <MovieView
                reloadUser={this.reloadUser}
                token={token}
                user={user}
                movie={movies.find((m) => m._id === match.params.movieId)}
              />
            )}
          />

          <Route
            exact
            path="/Director/:name"
            render={({ match }) => {
              if (!movies) return <div className="main-view" />;
              return (
                <DirectorView
                  movie={
                    //movies.find((m) => m.Director.Name === match.params.name)
                    selectedMovie

                    // movies.find((m) => m.Director.Name === match.params.name)
                  }
                />
              );
            }}
          />
          <Route
            exact
            path="/genres/:name"
            render={({ match }) => {
              if (!movies) return <div className="main-view" />
              return (
                <GenreView
                  movie={
                    selectedMovie
                    /*// movies.find((m) => m.Genre.Name === match.params.name)
                    //}
                    />
                  );
                }}
              />
              <Route
                exact
                path="/:Title/genre"
                render={({ match }) => {
                  if (!movies) return <div className="main-view" />
                  return (
                    <GenreView */
                    //movie={
                    //movies.find((m) => m.Genre.Name === match.params.name)
                    // movies.find((m) => m.Title === match.params.Title)
                  }
                />
              );
            }}

          />
          {/* <Route exact path="/movies/:movieId" render=movie view /> */}

          {user && <Button onClick={() => this.onLoggedOut()}>
            <b>Log Out</b>
          </Button>}
        </div>
      </Router>
      /* <Router>
         <div className="main-view">
           <Route exact path="/" render={() => {
             if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
             return movies.map(m => <MovieCard key={m._id} movie={m}/>
               )
             }/>
           <Route path="/register" render={() => <RegistrationView />}/>
           <Route path="/movies/:movieId" render={({match})=> <MovieView movie={movies.find(m => m._id ===match.params.movieId)}/>}/>
         </div>
         <Route path="/directors/:name" render={({ match}) => {
           if (!movies) return <div className="main-view"/>
           return <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director}/>}
         } />
       </Router>
      /* <div className="main-view">
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
         <div>
           <Button onClick={() => this.onLoggedOut()}>
             <b>Log Out</b>
           </Button>
         </div>
       </div>*/
    )
  }
}