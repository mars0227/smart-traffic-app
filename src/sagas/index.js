import { fork, all } from 'redux-saga/effects';
import * as watchers from './watcher';

export default function* startForman() {
  yield all(Object.keys(watchers).map(key => fork(watchers[key])));
};