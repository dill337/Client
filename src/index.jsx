import React from 'react';
import ReactDOM from 'react-dom';
import { MainView } from './components/main-view/main-view';
//import statment to indicate that you need to bundle `./index.scss
import './index.scss';
//main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
  render() {
    return <MainView style={{ flex: 1 }} />;
  }
}
//finds the root of your app
const container = document.getElementsByClassName('app-container')[0];
//tells react to render your app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);
/*
export class MovieCard extends React.Component {
  render () {
    //this is given to the <moviecard> component by the outer world
    // which in this case is 'mainview' as 'mainview' is whats connectee to
    // your database via the movies endpoint of your API

    const { movie } = this.props;

    return (
      <div className="movie-card">{movie.Title}</div>
    );
  }
}  */