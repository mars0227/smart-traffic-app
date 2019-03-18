import initialState from './initialState';
import * as types from '../constants/actionTypes';

export default function (myReservations = initialState.myReservations, action) {
  switch (action.type) {
    case types.GET_MY_RESERVATIONS_SUCCEEDED:
      return { ...myReservations, data: action.payload };
    case types.SET_MY_RESERVATION_FILTER:
      return { ...myReservations, filterBy: action.payload };
    case types.SET_SHOWING_RESERVATION_ID:
      return { ...myReservations, showingReservationId: action.payload };
    case types.GET_MY_RESERVATIONS:
    case types.GET_MY_RESERVATIONS_FAILED:
    default:
      return myReservations;
  }
};