import axios from 'axios';

// Cấu hình axios với URL backend mặc định
const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL, // URL backend từ .env hoặc mặc định
  timeout: 5000, // Thời gian timeout 5 giây
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => {
    // Trả về dữ liệu nếu không có lỗi
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Xử lý lỗi 401 (Unauthorized)
      alert(error.response.data.error);
      // Ví dụ: Điều hướng người dùng đến trang đăng nhập (nếu dùng React Router)
      // window.location.href = '/login';
      // Tùy chọn: Nếu cần xoá token (nếu lưu trong localStorage)
      // localStorage.removeItem('token');
    }
    // Trả lỗi tiếp để các xử lý khác vẫn hoạt động
    return Promise.reject(error);
  }
);

api.interceptors.request.use(
  (config) => {
    // Lấy token từ localStorage (hoặc sessionStorage)
    const token = localStorage.getItem('token');
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
    // Trả về dữ liệu nếu không có lỗi
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Xử lý lỗi 401 (Unauthorized)
      alert(error.response.data.error || 'Unauthorized. Please log in again.');
      
      // Xóa token nếu cần
      localStorage.removeItem('token');
      
      // Điều hướng người dùng đến trang đăng nhập (nếu dùng React Router)
      // window.location.href = '/login';
    }
    // Trả lỗi tiếp để các xử lý khác vẫn hoạt động
    return Promise.reject(error);
  });

export default api;