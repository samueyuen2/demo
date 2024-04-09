import axiosWrapper from "./axiosWrapper";

export function search(payload) {
  const response = axiosWrapper(
    "post",
    '/api/toDoItem/search',
    payload
  );
  return response;
}

export function create(payload) {
  const response = axiosWrapper(
    "post",
    '/api/toDoItem/create',
    payload
  );
  return response;
}

export function modify(payload) {
  const response = axiosWrapper(
    "post",
    '/api/toDoItem/modify',
    payload
  );
  return response;
}