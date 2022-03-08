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
export const uploadImg = (data) => axios.post(`${baseUrl}/v2/api/${path}/admin/upload`, data);

// Admin Orders
export const getAdminOrders = (page = 1) => axios.get(`${baseUrl}/v2/api/${path}/admin/orders?page=${page}`);
export const editOrder = (id, data) => axios.put(`${baseUrl}/v2/api/${path}/admin/order/${id}`, { data });
export const delOrder = (id) => axios.delete(`${baseUrl}/v2/api/${path}/admin/order/${id}`);
export const delAllOrders = () => axios.delete(`${baseUrl}/v2/api/${path}/admin/orders/all`);

// Admin Coupons
export const getCoupons = (page = 1) => axios.get(`${baseUrl}/v2/api/${path}/admin/coupons?page=${page}`);
export const addNewCoupon = (data) => axios.post(`${baseUrl}/v2/api/${path}/admin/coupon`, { data });
export const editCoupon = (id, data) => axios.put(`${baseUrl}/v2/api/${path}/admin/coupon/${id}`, { data });
export const delCoupon = (id) => axios.delete(`${baseUrl}/v2/api/${path}/admin/coupon/${id}`);

// Admin Article
export const getArticles = (page = 1) => axios.get(`${baseUrl}/v2/api/${path}/admin/articles?page=${page}`);
export const getArticle = (id) => axios.get(`${baseUrl}/v2/api/${path}/admin/article/${id}`);
export const addNewArticle = (data) => axios.post(`${baseUrl}/v2/api/${path}/admin/article`, { data });
export const editArticle = (id, data) => axios.put(`${baseUrl}/v2/api/${path}/admin/article/${id}`, { data });
export const delArticle = (id) => axios.delete(`${baseUrl}/v2/api/${path}/admin/article/${id}`);

// User Products
export const getAllProducts = () => axios.get(`${baseUrl}/v2/api/${path}/products/all`);
export const getProducts = (page = 1, category) => {
  if (category && category !== 'All') {
    return axios.get(`${baseUrl}/v2/api/${path}/products?page=${page}&category=${category}`);
  }
  return axios.get(`${baseUrl}/v2/api/${path}/products?page=${page}`);
};
