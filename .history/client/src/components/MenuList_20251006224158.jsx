import React from 'react';
import { useState, useEffect } from 'react';
import api from '../api/axiosConfig';
import MenuItem from './MenuItem';

function MenuList() {
  const [menus, setMenus] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-200 to-red-500 flex flex-col items-center py-6">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-white mb-4 text-center">Danh sách Menu</h1>
        {error && <p className="text-red-200 text-center">{error}</p>}
        {isLoading && <p className="text-white text-center">Đang tải...</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedMenus.map((menu) => (
            <MenuItem key={menu._id} menu={menu} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MenuList;