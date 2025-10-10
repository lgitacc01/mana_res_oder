import React from 'react';

function MenuItem({ menu }) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 w-[220px] flex flex-col items-center text-center border border-gray-100 overflow-hidden">
      <div className="w-full h-36 bg-gray-100 flex items-center justify-center overflow-hidden">
        <img
          alt={menu.ten_mon_an}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 flex flex-col items-center">
        <h2 className="text-lg font-semibold text-gray-800 mb-1">
          {menu.ten_mon_an}
        </h2>
        <p className="text-blue-600 font-bold text-md mb-2">
          {menu.gia?.toLocaleString('vi-VN')} ₫
        </p>
        {menu.mo_ta && (
          <p className="text-gray-500 text-sm line-clamp-2">{menu.mo_ta}</p>
        )}
      </div>
    </div>
  );
}

export default MenuItem;