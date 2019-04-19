import initialState from './initialState';
import * as types from '../constants/actionTypes';
import { reservationStateMap } from '../utils/response';

export default function (reservation = initialState.reservation, action) {
  const { type, payload } = action;
  switch (type) {
    case types.SET_RESERVATION:
      return { data: payload, updateOk: false, errMsg: null };
    case types.UPDATE_RESERVATION_BY_WEBSOCKET:
    case types.UPDATE_RESERVATION_SUCCEEDED:
      const { reservationId, state } = payload;
      const { data } = reservation;
      if (data.reservation_id === reservationId) {
        return {
          ...reservation,
          updateOk: true,
          data: {
            ...data,
            state: reservationStateMap(state)
          }
        }
      }
      return reservation;
    case types.UPDATE_RESERVATION_FAILED:
      return { ...reservation, updateOk: false, errMsg: payload };
    default:
      return reservation;
  }
};