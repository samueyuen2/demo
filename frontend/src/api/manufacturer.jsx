import axiosWrapper from "./axiosWrapper";

export function search(payload) {
  const response = axiosWrapper(
    "post",
    '/api/manufacturer/search',
    payload
  );
  return response;
}

export function create(payload) {
  const response = axiosWrapper(
    "post",
    '/api/manufacturer/create',
    payload
  );
  return response;
}

export function modify(payload) {
  const response = axiosWrapper(
    "post",
    '/api/manufacturer/modify',
    payload
  );
  return response;
}