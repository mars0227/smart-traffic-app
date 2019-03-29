import initialState from './initialState';
import * as types from '../constants/actionTypes';

const reservationState = [
  'Created',
  'Accepted',
  'Refused',
  'Canceled'
];

export default function (allReservations = initialState.allReservations, action) {
  const { type, payload } = action;
  switch (type) {
    case types.GET_ALL_RESERVATIONS_SUCCEEDED:
      return { ...allReservations, data: payload };
    case types.SET_RESERVATION_BY_NOTIFICATION:
      if (allReservations.data.length === 0) return allReservations;
      return { ...allReservations, data: [...allReservations.data, payload] };
    case types.SET_ALL_RESERVATIONS_FILTER:
      return { ...allReservations, filterBy: payload };
    case types.SET_ALL_RESERVATIONS_SHOWING_RESERVATION_ID:
      return { ...allReservations, showingReservationId: payload };
    case types.UPDATE_RESERVATION_SUCCEEDED:
      const { reservationId, state } = payload;
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