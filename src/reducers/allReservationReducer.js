import initialState from './initialState';
import * as types from '../constants/actionTypes';

export default function (allReservations = initialState.allReservations, action) {
  switch (action.type) {
    case types.GET_ALL_RESERVATIONS_SUCCEEDED:
      return { ...allReservations, data: action.payload };
    case types.SET_ALL_RESERVATIONS_FILTER:
      return { ...allReservations, filterBy: action.payload };
    case types.SET_ALL_RESERVATIONS_SHOWING_RESERVATION_ID:
      return { ...allReservations, showingReservationId: action.payload };
    case types.GET_ALL_RESERVATIONS:
    case types.GET_ALL_RESERVATIONS_FAILED:
    default:
      return allReservations;
  }
};