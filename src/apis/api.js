import {
  fetchGet,
  fetchGetWithToken,
  fetchPost,
  fetchPostWithToken,
  fetchPut,
  fetchPutWithToken,
  fetchPutFiles
} from './libs/fetch';

// const route = 'http://127.0.0.1:3000';
const route = 'http://172.20.10.3:3002'; // iPhone
// export const login = (payload) => fetchPost(`${route}/login`, payload);

export const login = payload => fetchPost(`${route}/login`, payload);
export const getConstructions = () => fetchGet(`${route}/constructions`);
export const getIdentities = () => fetchGet(`${route}/identities`);
//TODO: fetchGet => fetchGetWithToken
export const getReservations = payload => fetchGet(`${route}/reservations`, payload);
export const getReservation = ({ id }) => fetchGet(`${route}/reservations/${id}`);

export const setReservation = payload => fetchPost(`${route}/reservations`, payload);