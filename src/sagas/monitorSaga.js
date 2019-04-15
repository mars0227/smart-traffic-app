import { put, call } from 'redux-saga/effects';
import * as types from '../constants/actionTypes';
import {
  getMonitorView,
  updateAlertState
} from '../apis/api';

export function* getMonitorViewSaga() {
  try {
    yield put({ type: types.FETCHING});
    const res = yield call(getMonitorView);
    yield put({ type: types.FETCH_COMPLETE});

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
    console.warn('getMonitorViewSaga error', err);
    //TODO: send SYSTEM ERROR action.
  }
};


export function* updateAlertStateSaga({ payload }) {
  try {
    yield put({ type: types.FETCHING});
    const res = yield call(updateAlertState, payload);
    yield put({ type: types.FETCH_COMPLETE});

    const resAction = res.ok ?
      {
        type: types.UPDATE_ALERT_STATE_SUCCEEDED,
        payload
      } : {
        type: types.UPDATE_ALERT_STATE_FAILED,
        payload: {
          errMsg: res.result.data.errMsg
        }
      }

    yield put(resAction);

  } catch (err) {
    console.warn('updateAlertStateSaga error', err);
    //TODO: send SYSTEM ERROR action.
  }
};
