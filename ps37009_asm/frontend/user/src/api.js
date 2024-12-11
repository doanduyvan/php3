import axios from 'axios';
import { notification } from 'antd';

// Cấu hình axios với URL backend mặc định
const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL, // URL backend từ .env hoặc mặc định
  timeout: 10000, // Thời gian timeout 10 giây
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    // Lấy token từ localStorage (hoặc sessionStorage)
    const userInfoJson = localStorage.getItem('userInfo');
    const userInfo = userInfoJson ? JSON.parse(userInfoJson) : null
    const token = userInfo?.token;
    // Nếu token tồn tại, thêm vào header Authorization
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Xử lý lỗi trước khi request được gửi đi
    return Promise.reject(error);
  }
);

// Interceptor để xử lý lỗi response
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      const token = localStorage.getItem('token');
      if (token) {
        localStorage.removeItem('token');
      }
    }
    return Promise.reject(error);
  });

export default api;