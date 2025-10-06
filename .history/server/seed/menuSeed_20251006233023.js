const mongoose = require('mongoose');
const Menu = require('../models/Menu');

const menuItems = [
  { gia: "35000", ten_mon_an: "Phở bò" },
  { gia: "30000", ten_mon_an: "Bún riêu cua" },
  { gia: "25000", ten_mon_an: "Mì quảng" },
  { gia: "40000", ten_mon_an: "Cơm tấm sườn bì chả" },
  { gia: "20000", ten_mon_an: "Bánh mì pate" },
  { gia: "15000", ten_mon_an: "Xôi gà" },
  { gia: "45000", ten_mon_an: "Lẩu thái" },
  { gia: "30000", ten_mon_an: "Bún bò Huế" },
  { gia: "25000", ten_mon_an: "Bánh xèo" },
  { gia: "35000", ten_mon_an: "Gỏi cuốn tôm thịt" },
  { gia: "28000", ten_mon_an: "Cơm chiên dương châu" },
  { gia: "32000", ten_mon_an: "Mì xào hải sản" },
  { gia: "18000", ten_mon_an: "Chè ba màu" },
  { gia: "22000", ten_mon_an: "Bánh flan" },
  { gia: "40000", ten_mon_an: "Bò kho bánh mì" },
  { gia: "30000", ten_mon_an: "Hủ tiếu nam vang" },
  { gia: "25000", ten_mon_an: "Cao lầu" },
  { gia: "35000", ten_mon_an: "Gà nướng cơm lam" },
  { gia: "20000", ten_mon_an: "Nước sâm bổ lượng" },
  { gia: "15000", ten_mon_an: "Trà sữa trân châu" }
];

async function seedMenu() {
  try {
    // Verify the current database
    const dbName = mongoose.connection.db.databaseName;
    console.log(`Database hiện tại: ${dbName}`);
    if (dbName !== 'restaurant_mana') {
      throw new Error('Sai database! Đang kết nối với ' + dbName + ', cần kết nối với restaurant_mana.');
    }

    console.log('Đang xóa các món ăn hiện có trong collection menu...');
    await Menu.deleteMany({});
    console.log('Đã xóa collection menu trong database restaurant_mana.');

    console.log('Đang chèn dữ liệu mẫu vào collection menu...');
    await Menu.insertMany(menuItems);
    console.log('Đã chèn dữ liệu mẫu:', menuItems);
  } catch (err) {
    console.error('Lỗi khi seed dữ liệu menu:', err.message);
  }
}

module.exports = { seedMenu };