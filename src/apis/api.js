import {
  fetchGet,
  fetchGetWithToken,
  fetchPost,
  fetchPostWithToken,
  fetchPostWithFile,
  fetchPut,
  fetchPutWithToken,
  fetchPutFiles,
  fetchPatch
} from './libs/fetch';

// const route = 'http://127.0.0.1:3000';
// const route = 'http://172.20.10.3:3002'; // iPhone
const route = __DEV__
  ? 'http://172.20.10.3:3002'
  : 'http://www.itrackcon.com/stserver'; //vircon server
// export const login = (payload) => fetchPost(`${route}/login`, payload);

export const login = payload => fetchPost(`${route}/login`, payload);
export const getConstructions = () => fetchGet(`${route}/constructions`);
export const getIdentities = () => fetchGet(`${route}/identities`);
//TODO: fetchGet => fetchGetWithToken
export const getReservations = payload => fetchGet(`${route}/reservations`, payload);
export const getReservation = ({ id }) => fetchGet(`${route}/reservations/${id}`);

export const setReservation = payload => fetchPostWithFile(`${route}/reservations`, payload);
export const updateReservation = ({ reservationId, ...payload }) => fetchPatch(`${route}/reservations/${reservationId}`, payload);

export const setExpoPushToken = ({ userId, ...payload }) => fetchPost(`${route}/users/${userId}/expo_push_token`, payload);