import axiosWrapper from "./axiosWrapper";

export function search(payload) {
  const response = axiosWrapper(
    "post",
    '/api/brand/search',
    payload
  );
  return response;
}

export function create(payload) {
  const response = axiosWrapper(
    "post",
    '/api/brand/create',
    payload
  );
  return response;
}

export function modify(payload) {
  const response = axiosWrapper(
    "post",
    '/api/brand/modify',
    payload
  );
  return response;
}