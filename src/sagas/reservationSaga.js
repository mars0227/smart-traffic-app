import { put, call } from 'redux-saga/effects';
import * as types from '../constants/actionTypes';
import {
  setReservation,
  getReservations,
  updateReservation
} from '../apis/api';

export function* createReservationSaga({ payload }) {
  try {
    yield put({ type: types.FETCHING});
    const res = yield call(createReservation, payload);
    yield put({ type: types.FETCH_COMPLETE});

    const resAction = res.ok ?
      {
        type: types.CREATE_RESERVATION_SUCCEEDED,
        payload: res.result.data
      } : {
        type: types.CREATE_RESERVATION_FAILED,
        payload: {
          errMsg: res.result.errMsg
        }
      }

    yield put(resAction);
  } catch (err) {
    console.warn('createReservationSaga error', err);
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


export function* getAllReservationsSaga({ payload }) {
  try {
    yield put({ type: types.FETCHING});
    const res = yield call(getReservations, payload);
    yield put({ type: types.FETCH_COMPLETE});

    const resAction = res.ok ?
      {
        type: types.GET_ALL_RESERVATIONS_SUCCEEDED,
        payload: res.result.data
      } : {
        type: types.GET_ALL_RESERVATIONS_FAILED,
        payload: {
          errMsg: res.result.errMsg
        }
      }

    yield put(resAction);
  } catch (err) {
    console.warn('getReservationsSaga error', err);
    //TODO: send SYSTEM ERROR action.
  }
};

export function* updateReservationSaga({ payload }) {
  try {
    yield put({ type: types.FETCHING});
    const res = yield call(updateReservation, payload);
    yield put({ type: types.FETCH_COMPLETE});

    const resAction = res.ok ?
      {
        type: types.UPDATE_RESERVATION_SUCCEEDED,
        payload
      } : {
        type: types.UPDATE_RESERVATION_FAILED,
        payload: {
          errMsg: res.result.errMsg
        }
      }

    yield put(resAction);
  } catch (err) {
    console.warn('updateReservationSaga error', err);
    //TODO: send SYSTEM ERROR action.
  }
};