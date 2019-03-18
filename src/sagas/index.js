import { fork, all } from 'redux-saga/effects';
import * as watchers from './watcher';

export default function* startForman() {
  /*
  yield all([
    fork(watchGetIdentities),
    fork(watchLogin)
  ]);
  */
  yield all(Object.keys(watchers).map(key => fork(watchers[key])));
};