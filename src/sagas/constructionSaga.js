import { put, call } from 'redux-saga/effects';
import * as types from '../constants/actionTypes';
import {
  getConstructions
} from '../apis/api';

export function* constructionSaga() {
  try {
    yield put({ type: types.FETCHING});
    const res = yield call(getConstructions);
    yield put({ type: types.FETCH_COMPLETE});

    const resAction = res.ok ?
      {
        type: types.GET_CONSTRUCTIONS_SUCCEEDED,
        payload: res.result.data
      } : {
        type: types.GET_CONSTRUCTIONS_FAILED,
        payload: {
          errMsg: res.result.errMsg
        }
      }

    yield put(resAction);

  } catch (err) {
    console.warn('constructionSaga error', err);
    //TODO: send SYSTEM ERROR action.
  }
};
