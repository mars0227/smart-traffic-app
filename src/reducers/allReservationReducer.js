import initialState from './initialState';
import * as types from '../constants/actionTypes';

const reservationState = [
  'Created',
  'Accepted',
  'Refused',
  'Canceled'
];

export default function (allReservations = initialState.allReservations, action) {
  switch (action.type) {
    case types.GET_ALL_RESERVATIONS_SUCCEEDED:
      return { ...allReservations, data: action.payload };
    case types.SET_ALL_RESERVATIONS_FILTER:
      return { ...allReservations, filterBy: action.payload };
    case types.SET_ALL_RESERVATIONS_SHOWING_RESERVATION_ID:
      return { ...allReservations, showingReservationId: action.payload };
    case types.UPDATE_RESERVATION_SUCCEEDED:
      const { reservationId, state } = action.payload;
      const { data, showingReservationId } = allReservations;
      if (showingReservationId === reservationId) {
        return {
          ...allReservations,
          data: data.map(
            reservation => reservation.reservation_id === reservationId
              ? { ...reservation, state: reservationState.indexOf(state) + 1 }
              : reservation
        ) }
      }
      return allReservations;
    case types.GET_ALL_RESERVATIONS:
    case types.GET_ALL_RESERVATIONS_FAILED:
    default:
      return allReservations;
  }
};