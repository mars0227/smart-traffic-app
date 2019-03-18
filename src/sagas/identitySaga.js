import { put, call } from 'redux-saga/effects';
import * as types from '../constants/actionTypes';
import {
  getIdentities
} from '../apis/api';

export function* identitySaga() {
  try {
    yield put({ type: types.FETCHING});
    const res = yield call(getIdentities);
    yield put({ type: types.FETCH_COMPLETE});

    const resAction = res.ok ?
      {
        type: types.GET_IDENTITIES_SUCCEEDED,
        payload: {
          identities: res.result.data
        }
      } : {
        type: types.GET_IDENTITIES_FAILED,
        payload: {
          identities: []
        }
      }

    yield put(resAction);

  } catch (err) {
    console.warn('identitySaga error', err);
    //TODO: send SYSTEM ERROR action.
  }
};
