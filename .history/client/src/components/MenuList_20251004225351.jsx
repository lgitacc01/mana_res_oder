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
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Danh sách Menu</h1>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      {isLoading && <p className="text-gray-500 mb-4 text-center">Đang tải...</p>}
      <div className="space-y-4">
        {menus.map((menu) => (
          <MenuItem key={menu._id} menu={menu} />
        ))}
      </div>
    </div>
  );
}

export default MenuList;