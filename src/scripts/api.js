import axios from 'axios';

const baseUrl = process.env.VUE_APP_API;
const path = process.env.VUE_APP_PATH;

// Login
export const apiUserLogin = (data) => axios.post(`${baseUrl}/v2/admin/signin`, data);
export const apiUserCheck = () => {
  const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
  axios.defaults.headers.common.Authorization = token;
  return axios.post(`${baseUrl}/v2/api/user/check`);
};

// Admin Products
export const getAdminProducts = (page = 1, category) => {
  if (category && category !== 'All') {
    return axios.get(`${baseUrl}/v2/api/${path}/admin/products?page=${page}&category=${category}`);
  }
  return axios.get(`${baseUrl}/v2/api/${path}/admin/products?page=${page}`);
};
export const addNewProduct = (data) => axios.post(`${baseUrl}/v2/api/${path}/admin/product`, { data });
export const editProduct = (id, data) => axios.put(`${baseUrl}/v2/api/${path}/admin/product/${id}`, { data });
export const delProduct = (id) => axios.delete(`${baseUrl}/v2/api/${path}/admin/product/${id}`);
