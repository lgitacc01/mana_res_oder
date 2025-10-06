import React from 'react';

function MenuItem({ menu }) {
  return (
    <div className="text-red-500">
      <h2>STT: {menu.stt}</h2>
      <p>Tên món: {menu.ten_mon}</p>
    </div>
  );}

export default MenuItem;