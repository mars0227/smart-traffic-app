import { put, call } from 'redux-saga/effects';
import * as types from '../constants/actionTypes';
import {
  login,
  setExpoPushToken,
  setUserActiveState
} from '../apis/api';

export function* loginSaga({ payload }) {
  try {
    yield put({ type: types.FETCHING });
    const res = yield call(login, payload);
    yield put({ type: types.FETCH_COMPLETE});

    const resAction = res.ok ?
      {
        type: types.LOGIN_SUCCEEDED,
        payload: res.result.data
      } : {
        type: types.LOGIN_FAILED,
        payload: {
          errMsg: res.result.errMsg
        }
      }

    yield put(resAction);

  } catch (err) {
    console.warn('[saga] login error', err);
    //TODO: send SYSTEM ERROR action.
  }
};

export function* setExpoPushTokenSaga({ payload }) {
  try {
    yield put({ type: types.FETCHING });
    const res = yield call(setExpoPushToken, payload);
    yield put({ type: types.FETCH_COMPLETE});

    const resAction = res.ok ?
      {
        type: types.SET_EXPO_PUSH_TOKEN_SUCCEEDED,
        payload
      } : {
        type: types.SET_EXPO_PUSH_TOKEN_FAILED,
        payload: {
          errMsg: res.result.errMsg
        }
      }

    yield put(resAction);

  } catch (err) {
    console.warn('[saga] login error', err);
    //TODO: send SYSTEM ERROR action.
  }
};



export function* setUserActiveStateSaga({ payload }) {
  try {
    console.log(payload);
    yield put({ type: types.FETCHING });
    const res = yield call(setUserActiveState, payload);
    yield put({ type: types.FETCH_COMPLETE});

    const resAction = res.ok ?
      {
        type: types.SET_EXPO_PUSH_TOKEN_SUCCEEDED,
        payload
      } : {
        type: types.SET_EXPO_PUSH_TOKEN_FAILED,
        payload: {
          errMsg: res.result.errMsg
        }
      }

    yield put(resAction);

  } catch (err) {
    console.warn('[saga] set user active state error', err);
    //TODO: send SYSTEM ERROR action.
  }
};