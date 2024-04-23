import axiosWrapper from "./axiosWrapper";

export function search(payload) {
  const response = axiosWrapper(
    "post",
    '/api/order/search',
    payload
  );
  return response;
}

export function create(payload) {
  const response = axiosWrapper(
    "post",
    '/api/order/create',
    payload
  );
  return response;
}

export function modify(payload) {
  const response = axiosWrapper(
    "post",
    '/api/order/modify',
    payload
  );
  return response;
}