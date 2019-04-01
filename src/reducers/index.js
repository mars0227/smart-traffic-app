import { combineReducers } from 'redux';
import identities from './identityReducer';
import login from './loginReducer';
import myReservations from './myReservationReducer';
import constructions from './constructionReducer';
import createReservation from './createReservationReducer';
import allReservations from './allReservationReducer';
import updateReservation from './updateReservationReducer';
import notification from './notificationReducer';
import monitor from './monitorReducer';

// will be store key name
const appReducer = combineReducers({
  identities,
  login,
  myReservations,
  constructions,
  createReservation,
  allReservations,
  updateReservation,
  notification,
  monitor
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
