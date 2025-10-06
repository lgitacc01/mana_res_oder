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
  <div>
    <div>
      <h1>Danh sách Menu</h1>
      {error && <p>{error}</p>}
      {isLoading && <p>Đang tải...</p>}
      <div>
        {menus.map((menu) => (
          <MenuItem key={menu._id} menu={menu} />
        ))}
      </div>
    </div>
  </div>
);  
}

export default MenuList;