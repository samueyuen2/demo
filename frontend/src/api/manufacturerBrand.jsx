import axiosWrapper from "./axiosWrapper";

export function searchBrands(payload) {
  console.log("api payload:", payload)
  const response = axiosWrapper(
    "post",
    '/api/manufacturerBrand/searchBrands',
    payload
  );
  return response;
}