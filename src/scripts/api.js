import axios from 'axios';

const baseUrl = 'https://vue3-course-api.hexschool.io';
// const path = 'timtest';

// Login
export const apiUserLogin = (data) => axios.post(`${baseUrl}/v2/admin/signin`, data);
export const apiUserCheck = () => {
  const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
  axios.defaults.headers.common.Authorization = token;
  return axios.post(`${baseUrl}/v2/api/user/check`);
};
