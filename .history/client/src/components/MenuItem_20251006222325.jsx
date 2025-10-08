import React from 'react';
import /.index.css;

function MenuItem({ menu }) {
  return (
    <div>
      <h2>STT: {menu.stt}</h2>
      <p>Tên món: {menu.ten_mon}</p>
    </div>
  );
}

export default MenuItem;