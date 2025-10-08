import React from 'react';

function MenuItem({ menu }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 m-2 max-w-sm transition-transform transform hover:scale-105">
      <h2 className="text-xl font-bold text-indigo-600 mb-2">
        Giá: {menu.gia}
      </h2>
      <p className="text-lg font-semibold text-gray-800">
        Tên món: {menu.ten_mon_an}
      </p>
    </div>
  );
}

export default MenuItem;