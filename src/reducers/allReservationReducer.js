import initialState from './initialState';
import * as types from '../constants/actionTypes';
import { reservationStateMap } from '../utils/response';

export default function (allReservations = initialState.allReservations, action) {
  const { type, payload } = action;
  switch (type) {
    case types.GET_ALL_RESERVATIONS_SUCCEEDED:
      return { ...allReservations, data: payload };
    case types.SET_ALL_RESERVATIONS_FILTER:
      return { ...allReservations, filterBy: payload };
    case types.SET_ALL_RESERVATIONS_SHOWING_RESERVATION_ID:
      return { ...allReservations, showingReservationId: payload };
    case types.UPDATE_RESERVATION_SUCCEEDED:
    case types.UPDATE_RESERVATION_BY_WEBSOCKET:
      const { reservationId, state } = payload;
      const { data } = allReservations;
      return {
        ...allReservations,
        data: data.map(
          reservation => reservation.reservation_id === reservationId
            ? { ...reservation, state: reservationStateMap(state) }
            : reservation
        )
      };
    case types.ADD_RESERVATION_BY_WEBSOCKET:
      const reservationArray = allReservations.data;
      const index = reservationArray.findIndex(reservation => reservation.reservation_id === payload.reservation_id);
      if (index === -1) {
        return { ...allReservations, data: [...reservationArray, payload] };
      }
      return { ...allReservations, data: reservationArray.splice(index, 1, payload) };
    case types.GET_ALL_RESERVATIONS:
    case types.GET_ALL_RESERVATIONS_FAILED:
    default:
      return allReservations;
  }
};