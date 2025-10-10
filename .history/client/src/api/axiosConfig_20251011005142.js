import axios from 'axios';

// Vite sẽ tự động đọc biến VITE_API_BASE_URL từ file .env phù hợp
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

console.log(`API Base URL is: ${apiBaseUrl}`); // Dòng này để bạn kiểm tra xem nó đang dùng URL nào

const api = axios.create({
  baseURL: apiBaseUrl, 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;