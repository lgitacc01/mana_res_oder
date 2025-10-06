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

 return (
  <div className="bg-amber-200 min-h-screen py-8">
    <div className="container mx-auto p-4 max-w-2xl bg-white border-2 border-red-500 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center text-pink-500">Danh sách Menu</h1>
      {error && <p className="text-pink-400 mb-4 text-center font-medium">{error}</p>}
      {isLoading && <p className="text-pink-600 mb-4 text-center font-medium">Đang tải...</p>}
      <div className="space-y-4">
        {menus.map((menu) => (
          <MenuItem key={menu._id} menu={menu} />
        ))}
      </div>
    </div>
  </div>
);
}

export default MenuList;