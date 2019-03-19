import queryString from 'query-string';
import { pipeAsync } from '../../utils/functional';

const defaultHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
};

const defaultFetch = async (payload) => {
  const { method, url, headers, body } = payload;

  try {
    const res = await fetch(url, {
      method,
      headers: {...defaultHeaders, ...headers},
      mode: 'cors',
      cache: 'default',
      body,
    });

    const { status: statusCode, ok } = res;
    
    const result = await res.json();

    return {
      statusCode,
      ok,
      result
    };
  } catch (error) {
    console.warn(method, url, 'api error: ', error);
    return { ok: false, error };
  }
};

const getUrl = ({route, query, ...params}) => ({
  ...params,
  url: query
    ? `${route}?${queryString.stringify(query)}`
    : route
});

const withToken = ({idToken, ...params}) => ({
  ...params,
  headers: {Authorization: idToken},
  retry: true
});

const getBody = ({payload, ...params}) => ({
  ...params,
  body: JSON.stringify(payload)
});

export const fetchGet = async (route, query) => await pipeAsync(
  getUrl,
  defaultFetch
)({route, query, method: 'GET'});

export const fetchGetWithToken = async (route, idToken, query) => await pipeAsync(
  getUrl,
  withToken,
  defaultFetch
)({route, idToken, query, method: 'GET'});

export const fetchPost = async (url, payload) => await pipeAsync(
  getBody,
  defaultFetch
)({url, payload, method: 'POST'});

export const fetchPostWithToken = async (url, idToken, payload) => await pipeAsync(
  getBody,
  withToken,
  defaultFetch
)({url, idToken, payload, method: 'POST'});

export const fetchPut = async (url, payload) => await pipeAsync(
  getBody,
  defaultFetch
)({url, payload, method: 'PUT'});

export const fetchPutWithToken = async (url, idToken, payload) => await pipeAsync(
  getBody,
  withToken,
  defaultFetch
)({url, idToken, payload, method: 'PUT'});

export const fetchPutFiles = async (url, body) => await defaultFetch({ url, body, method: 'PUT' });

export const fetchPatch = async (url, payload) => await pipeAsync(
  getBody,
  defaultFetch
)({url, payload, method: 'PATCH'});
