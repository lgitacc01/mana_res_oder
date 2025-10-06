import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig';
import MenuItem from './MenuItem';

function MenuList() {
  const [menus, setMenus] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // State cho trang hiện tại

  const itemsPerPage = 9; // 9 món mỗi trang
  const totalPages = Math.ceil(menus.length / itemsPerPage); // Tính tổng số trang

  useEffect(() => {
    const fetchMenus = async () => {
      setIsLoading(true);
      try {
        const response = await api.get('/api/menu');
        setMenus(response.data);
        setError('');
      } catch (err) {
        setError('Không thể tải danh sách menu: ' + (err.response?.data?.message || err.message));
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMenus();
  }, []);

  // Sort menus by stt in ascending order
  const sortedMenus = [...menus].sort((a, b) => a.stt - b.stt);

  // Tính toán các món ăn cho trang hiện tại
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMenus = sortedMenus.slice(startIndex, endIndex);

  // Hàm chuyển trang
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-200 to-red-500 flex flex-col items-center py-6">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-white mb-4 text-center">Danh sách Menu</h1>
        {error && <p className="text-red-200 text-center">{error}</p>}
        {isLoading && <p className="text-white text-center">Đang tải...</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {currentMenus.map((menu) => (
            <MenuItem key={menu._id} menu={menu} />
          ))}
        </div>
      </div>
      {/* Nút phân trang cố định dưới cùng */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm p-4 flex justify-center gap-6">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-lg font-semibold text-white ${
            currentPage === 1
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
        >
          Trang trước
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages || totalPages === 0}
          className={`px-4 py-2 rounded-lg font-semibold text-white ${
            currentPage === totalPages || totalPages === 0
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
        >
          Trang sau
        </button>
      </div>
    </div>
  );
}

export default MenuList;