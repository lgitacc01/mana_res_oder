import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig';
import MenuItem from './MenuItem';

function MenuList() {
  const [menus, setMenus] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // State cho trang hiện tại

  const itemsPerPage = 8; // 8 món mỗi trang
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
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-pink-50 to-blue-50 py-12 flex flex-col items-center">
      <div className="max-w-6xl w-full bg-white/80 backdrop-blur-md shadow-2xl rounded-3xl p-10 border border-gray-100">
        <h1 className="text-3xl font-extrabold text-center text-indigo-700 mb-8 drop-shadow-sm">
          Danh sách món ăn
        </h1>

        {error && <p className="text-red-600 text-center mb-4">{error}</p>}
        {isLoading && <p className="text-indigo-600 text-center">Đang tải...</p>}

        {!isLoading && !error && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
            {currentMenus.length > 0 ? (
              currentMenus.map((menu) => <MenuItem key={menu._id} menu={menu} />)
            ) : (
              <p className="text-center col-span-full text-gray-600">Không có món ăn nào.</p>
            )}
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="mt-8 flex justify-center items-center gap-6">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className={`px-5 py-2 rounded-lg font-semibold text-white transition ${
              currentPage === 1
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            ⬅ Trang trước
          </button>

          <span className="font-semibold text-gray-700">
            Trang {currentPage} / {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className={`px-5 py-2 rounded-lg font-semibold text-white transition ${
              currentPage === totalPages
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            Trang sau ➡
          </button>
        </div>
      )}
    </div>
  );
}

export default MenuList;