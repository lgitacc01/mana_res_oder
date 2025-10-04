import React from 'react';

function MenuItem({ menu }) {
  return (
    <div className="border p-4 rounded bg-gray-50 shadow-sm mb-4">
      <h2 className="text-xl font-semibold text-gray-800">STT: {menu.stt}</h2>
      <p className="text-lg text-gray-700">Tên món: {menu.ten_mon}</p>
    </div>
  );
}

export default MenuItem;