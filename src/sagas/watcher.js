import { takeLatest } from 'redux-saga/effects';
import * as types from '../constants/actionTypes';
import { loginSaga } from './loginSaga';
import { identitySaga } from './identitySaga';
import { constructionSaga } from './constructionSaga';
import {
  setReservationSaga,
  getMyReservationsSaga,
  getAllReservationsSaga
} from './reservationSaga';

export function* watchLogin() {
  yield takeLatest(types.LOGIN, loginSaga);
};

export function* watchGetIdentities() {
  yield takeLatest(types.GET_IDENTITIES, identitySaga);
};

export function* watchGetConstructions() {
  yield takeLatest(types.GET_CONSTRUCTIONS, constructionSaga);
};

export function* watchSetReservation() {
  yield takeLatest(types.SET_RESERVATION, setReservationSaga);
};

export function* watchGetMyReservations() {
  yield takeLatest(types.GET_MY_RESERVATIONS, getMyReservationsSaga);
};


export function* watchGetReservations() {
  yield takeLatest(types.GET_ALL_RESERVATIONS, getAllReservationsSaga);
}