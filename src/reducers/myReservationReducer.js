import initialState from './initialState';
import * as types from '../constants/actionTypes';

const reservationState = [
  'Created',
  'Accepted',
  'Refused',
  'Canceled'
];

export default function (myReservations = initialState.myReservations, action) {
  switch (action.type) {
    case types.GET_MY_RESERVATIONS_SUCCEEDED:
      return { ...myReservations, data: action.payload };
    case types.SET_MY_RESERVATIONS_FILTER:
      return { ...myReservations, filterBy: action.payload };
    case types.SET_MY_RESERVATIONS_SHOWING_RESERVATION_ID:
      return { ...myReservations, showingReservationId: action.payload };
    case types.UPDATE_RESERVATION_SUCCEEDED:
    case types.UPDATE_RESERVATION_BY_NOTIFICATION:
      const { reservationId, state } = action.payload;
      const { data } = myReservations;
      if (myReservations.data.length === 0) return myReservations;
      return {
        ...myReservations,
        data: data.map(
          reservation => reservation.reservation_id === reservationId
            ? { ...reservation, state: reservationState.indexOf(state) + 1 }
            : reservation
      ) }
    case types.GET_MY_RESERVATIONS:
    case types.GET_MY_RESERVATIONS_FAILED:
    default:
      return myReservations;
  }
};