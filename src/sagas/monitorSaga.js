import { put, call } from 'redux-saga/effects';
import * as types from '../constants/actionTypes';
import {
  getMonitorView
} from '../apis/api';

export function* getMonitorViewSaga() {
  try {
    yield put({ type: types.FETCHING});
    const res = yield call(getMonitorView);
    yield put({ type: types.FETCH_COMPLETE});
    console.log('get monitor view res', res);
    const resAction = res.ok ?
      {
        type: types.GET_MONITOR_VIEW_SUCCEEDED,
        payload: {
          ...res.result.data,
          errMsg: undefined
        }
      } : {
        type: types.GET_MONITOR_VIEW_FAILED,
        payload: {
          errMsg: res.result.data.errMsg
        }
      }

    yield put(resAction);

  } catch (err) {
    console.warn('identitySaga error', err);
    //TODO: send SYSTEM ERROR action.
  }
};
