import initialState from './initialState';
import * as types from '../constants/actionTypes';

export default function (updateReservation = initialState.updateReservation, action) {

  switch (action.type) {
    case types.UPDATE_RESERVATION_SUCCEEDED:
      return { ...updateReservation, ok: true, errMsg: '' };
    case types.UPDATE_RESERVATION:
    case types.UPDATE_RESERVATION_FAILED:
      return { ...updateReservation, ok: false, errMsg: action.payload.errMsg };
    default:
      return updateReservation;
  }
};