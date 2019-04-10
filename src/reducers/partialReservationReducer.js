import initialState from './initialState';
import * as types from '../constants/actionTypes';
import { reservationState } from '../constants';
import { reservationStateMap } from '../utils/response';

export default function (partialReservations = initialState.partialReservations, action) {
  const { type, payload } = action;
  switch (type) {
    case types.SET_PARTIAL_RESERVATIONS:
      return payload;
    case types.UPDATE_RESERVATION_BY_NOTIFICATION:
    case types.UPDATE_RESERVATION_SUCCEEDED:
      const { reservationId, state } = payload;
      return partialReservations.map(
        reservation => reservation.reservation_id === reservationId
          ? { ...reservation, state: reservationStateMap(state) }
          : reservation
      );
    default:
      return partialReservations;
  }
};