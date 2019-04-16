import { takeLatest } from 'redux-saga/effects';
import * as types from '../constants/actionTypes';
import {
  loginSaga,
  setExpoPushTokenSaga,
  setUserActiveStateSaga
} from './loginSaga';
import { identitySaga } from './identitySaga';
import { constructionSaga } from './constructionSaga';
import {
  createReservationSaga,
  getMyReservationsSaga,
  getAllReservationsSaga,
  updateReservationSaga
} from './reservationSaga';
import {
  getMonitorViewSaga,
  updateAlertStateSaga
} from './monitorSaga';

export function* watchLogin() {
  yield takeLatest(types.LOGIN, loginSaga);
};

export function* watchGetIdentities() {
  yield takeLatest(types.GET_IDENTITIES, identitySaga);
};

export function* watchGetConstructions() {
  yield takeLatest(types.GET_CONSTRUCTIONS, constructionSaga);
};

export function* watchCreateReservation() {
  yield takeLatest(types.CREATE_RESERVATION, createReservationSaga);
};

export function* watchGetMyReservations() {
  yield takeLatest(types.GET_MY_RESERVATIONS, getMyReservationsSaga);
};

export function* watchGetReservations() {
  yield takeLatest(types.GET_ALL_RESERVATIONS, getAllReservationsSaga);
};

export function* watchUpdateReservation() {
  yield takeLatest(types.UPDATE_RESERVATION, updateReservationSaga);
};

export function* watchSetExpoPushToken() {
  yield takeLatest(types.SET_EXPO_PUSH_TOKEN, setExpoPushTokenSaga);
};

export function* watchGetMonitorView() {
  yield takeLatest(types.GET_MONITOR_VIEW, getMonitorViewSaga);
};

export function* watchUpdateAlertState() {
  yield takeLatest(types.UPDATE_ALERT_STATE, updateAlertStateSaga);
};

export function* watchSetUserActiveState() {
  yield takeLatest(types.SET_USER_ACTIVE_STATE, setUserActiveStateSaga);
};