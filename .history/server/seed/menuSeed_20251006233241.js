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
    console.log('Clearing existing menu items...');
    await Menu.deleteMany({});
    console.log('Menu collection cleared.');

    console.log('Seeding database with new menu items...');
    await Menu.insertMany(menuItems);
    console.log('Inserted sample menu items:', menuItems);
  } catch (err) {
    console.error('Error seeding menu:', err.message);
  }
}

module.exports = { seedMenu };