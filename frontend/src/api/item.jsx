import axiosWrapper from "./axiosWrapper";

export function search(payload) {
  const response = axiosWrapper(
    "post",
    '/api/item/search',
    payload
  );
  return response;
}

export function searchByBrandIds(payload) {
  const response = axiosWrapper(
    "post",
    '/api/item/searchByBrandIds',
    payload
  );
  return response;
}