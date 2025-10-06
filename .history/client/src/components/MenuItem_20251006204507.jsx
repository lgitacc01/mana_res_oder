import React from 'react';

function MenuItem({ menu }) {
  return (
    <div className="border-2 border-gray-200 p-6 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow duration-300 mb-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">STT: {menu.stt}</h2>
      <p className="text-lg text-gray-600 font-medium">Tên món: {menu.ten_mon}</p>
    </div>
  );
}

export default MenuItem;