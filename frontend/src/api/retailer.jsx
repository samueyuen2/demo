import axiosWrapper from "./axiosWrapper";

export function search(payload) {
  const response = axiosWrapper(
    "post",
    '/api/retailer/search',
    payload
  );
  return response;
}

export function create(payload) {
  const response = axiosWrapper(
    "post",
    '/api/retailer/create',
    payload
  );
  return response;
}

export function modify(payload) {
  const response = axiosWrapper(
    "post",
    '/api/retailer/modify',
    payload
  );
  return response;
}