import initialState from './initialState';
import * as types from '../constants/actionTypes';
import { reservationStateMap } from '../utils/response';

export default function (myReservations = initialState.myReservations, action) {
  switch (action.type) {
    case types.GET_MY_RESERVATIONS_SUCCEEDED:
      return { ...myReservations, data: action.payload };
    case types.SET_MY_RESERVATIONS_FILTER:
      return { ...myReservations, filterBy: action.payload };
    case types.SET_MY_RESERVATIONS_SHOWING_RESERVATION_ID:
      return { ...myReservations, showingReservationId: action.payload };
    case types.UPDATE_RESERVATION_SUCCEEDED:
    case types.UPDATE_RESERVATION_BY_WEBSOCKET:
      const { reservationId, state } = action.payload;
      const { data } = myReservations;
      if (myReservations.data.length === 0) return myReservations;
      return {
        ...myReservations,
        data: data.map(
          reservation => reservation.reservation_id === reservationId
            ? { ...reservation, state: reservationStateMap(state) }
            : reservation
        )
      }
    case types.GET_MY_RESERVATIONS:
    case types.GET_MY_RESERVATIONS_FAILED:
    default:
      return myReservations;
  }
};