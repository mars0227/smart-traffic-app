import { put, call } from 'redux-saga/effects';
import * as types from '../constants/actionTypes';
import {
  login
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
