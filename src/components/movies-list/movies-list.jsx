import React from 'react';
import { connect } from 'react-redux';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { MovieCard } from '../movie-card/movie-card';

const mapStateToProps = state => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function MoviesList(props) {
  const { movies, /*directors,*/ visibilityFilter } = props;
  let filteredMovies = movies;
  //let filteredDirectors = directors;

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter(m => m.Title.includes(visibilityFilter));
    //filteredDirectors = directors.movies.filter(m => m.Name.includes(visibilityFilter));
  }

  if (!movies) return <div className="main-view" />;

  return <div className="row">
    <VisibilityFilterInput visibilityFilter={visibilityFilter} />
    {filteredMovies.map(m => <MovieCard onMovieClick={props.onMovieClick} key={m._id} movie={m} />)};
  </div>
}

export default connect(mapStateToProps)(MoviesList);