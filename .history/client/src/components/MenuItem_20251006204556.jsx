import React from 'react';

function MenuItem({ menu }) {
  return (
    <div className="border-2 border-red-500 p-6 rounded-lg bg-brown-200 shadow-md hover:shadow-lg transition-shadow duration-300 mb-6">
      <h2 className="text-2xl font-bold text-pink-500 mb-2">STT: {menu.stt}</h2>
      <p className="text-lg font-medium text-pink-500">Tên món: {menu.ten_mon}</p>
    </div>
  );
}

export default MenuItem;