import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { setMovies, setUSer } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';
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
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        //user: localStorage.getItem('user'),

        user: JSON.parse(localStorage.getItem('user')),
        token: accessToken
      });
      this.getMovies(accessToken);
    }
  }

  /**
   * Loads movies from database
   * @function getMovies
   * @axios
   * @param {*} token 
   */
  getMovies = (token) => {
    axios.get('https://mymoviepull.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.props.setMovies(response.data);
        //this.setState({
        //movies: response.data
        //});
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  /**
   * generates token for user and saves data in localstorages
   * @function onLoggedIn
   * @param {*} authData 
   */
  onLoggedIn = (authData) => {
    console.log(authData);
    this.setState({
      user: authData.user
    });
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', JSON.stringify(authData.user));
    this.getMovies(authData.token);
  }

  /**
   * selects the movie clicked on to given more details
   * @function onMovieClick
   * @param {*} movie 
   */
  onMovieClick = (movie) => {
    this.setState({
      selectedMovie: movie
    });
  }

  /**
   * allows the user to register
   * @function onRegister
   * @param {*} user 
   */
  onRegister = (user) => {
    this.setState({
      user
    });
  }

  /**
   * Allows the User to log out
   * @function onLoggedOut
   */
  onLoggedOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null,
    });
    window.open('/', '_self');
  }

  /**
   * Allows users to relogin easily
   * @function reloadUser
   */
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

  /**
   * lets users update user info
   * @function onUpdate
   * @param {*} token 
   */
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

  /**
   * lets users deregister account
   * @function deregister
   */
  deRegister = () => {
    this.setState({
      register: false
    })
  }

  /**
   * lets new users register
   * @function onRegisterClick
   */
  onRegisterClick = () => {
    this.setState({
      register: true
    });
  }

  /**
   * Checks if the user does not have correct login credentials
   * @function notLogged
   */
  notLogged = () => {
    this.setState({
      user: false, register: false
    });
  }
  render() {
    //if the state isn't initialized, ths will throw on runtime
    //befor the datq is initially loaded
    //const { movies, selectedMovie, user, register, token } = this.state;

    // #2
    let { movies } = this.props;
    let { user, selectedMovie, token } = this.state;

    //if (!user && !register) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} onRegisterClick={this.onRegisterClick} />;
    //before the movies have been loaded
    //if (!user && register) return <RegistrationView onLoggedIn={user => this.onLoggedIn(user)} notLogged={this.notLogged} />
    //if (!movies) return <div className="main-view" />;
    return (
      <Router basename="/client">
        <div className="main-view">
          <Route exact path="/" render={() => {
            if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
            return <div>
              {
                user && <Link to={`/profile`}>
                  <Button className="button" variant="link">Profile</Button>
                </Link>
              }
              {
                user && <Button onClick={() => this.onLoggedOut()}>
                  <b>Log Out</b>
                </Button>
              }
              <MoviesList onMovieClick={this.onMovieClick} movies={movies} />
            </div>
          }} />
          <Route path="/register" render={() => <RegistrationView />} />
          <Route exact path="/profile" render={() => <ProfileView user={user} movies={movies} token={token} reloadUser={this.reloadUser} />} />
          <Route path="/movies/:movieId" render={({ match }) => <MovieView movie={movies.find(m => m._id === match.params.movieId)} user={user} />} />
          {/* <Route path="/directors/:name" render={({ match }) => {
            if (!movies) return <div className="main-view" />;
            return <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} />
          }
          } /> */}
          <Route
            exact
            path="/Director/:name"
            render={({ match }) => {
              if (!movies) return <div className="main-view" />;
              return (
                <DirectorView
                  movie={
                    selectedMovie
                  }
                />
              )
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
                  }
                />
              )
            }}
          />
        </div>
      </Router>
    )
  }
}

//#3 
let mapStateToProps = state => {
  return { movies: state.movies }
}

//#4 
export default connect(mapStateToProps, { setMovies })(MainView)
