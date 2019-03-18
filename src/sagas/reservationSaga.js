import { put, call } from 'redux-saga/effects';
import * as types from '../constants/actionTypes';
import {
  setReservation,
  getReservations
} from '../apis/api';

export function* setReservationSaga({ payload }) {
  try {
    yield put({ type: types.FETCHING});
    const res = yield call(setReservation, payload);
    yield put({ type: types.FETCH_COMPLETE});

    const resAction = res.ok ?
      {
        type: types.SET_RESERVATION_SUCCEEDED,
        payload: res.result.data
      } : {
        type: types.SET_RESERVATION_FAILED,
        payload: {
          errMsg: res.result.errMsg
        }
      }

    yield put(resAction);
  } catch (err) {
    console.warn('setReservationSaga error', err);
    //TODO: send SYSTEM ERROR action.
  }
};

export function* getMyReservationsSaga({ payload }) {
  try {
    yield put({ type: types.FETCHING});
    const res = yield call(getReservations, payload);
    yield put({ type: types.FETCH_COMPLETE});

    const resAction = res.ok ?
      {
        type: types.GET_MY_RESERVATIONS_SUCCEEDED,
        payload: res.result.data
      } : {
        type: types.GET_MY_RESERVATIONS_FAILED,
        payload: {
          errMsg: res.result.errMsg
        }
      }

    yield put(resAction);
  } catch (err) {
    console.warn('getMyReservationsSaga error', err);
    //TODO: send SYSTEM ERROR action.
  }
};
