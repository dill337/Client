import { combineReducers } from 'redux';

import { SET_FILTER, SET_MOVIES, SET_USER, /*SET_DIRECTORS*/ } from '../actions/actions';

function visibilityFilter(state = '', action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    default:
      return state;
  }
}

function movies(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      return action.value;
    default:
      return state;
  }
}

function userProfile(state = null, action) {
  switch (action.type) {
    case SET_USER:
      return action.value;
    default:
      return state;
  }
}

// function directors( state = [], action) {
//   switch (action.type) {
//     case SET_DIRECTORS: 
//       return action.value
//     default:
//       return state;
//   }
// }


const moviesApp = combineReducers({
  visibilityFilter,
  movies,
  userProfile,
  //directors
});



export default moviesApp;