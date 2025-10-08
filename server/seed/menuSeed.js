const Menu = require('../models/Menu');

const menuItems = [
  { gia: "35000", ten_mon_an: "Phở bò", hinh_anh: "/images/pho-bo.jpeg" },
  { gia: "30000", ten_mon_an: "Bún riêu cua", hinh_anh: "" },
  { gia: "25000", ten_mon_an: "Mì quảng", hinh_anh: "" },
  { gia: "40000", ten_mon_an: "Cơm tấm sườn bì chả", hinh_anh: "" },
  { gia: "20000", ten_mon_an: "Bánh mì pate", hinh_anh: "" },
  { gia: "15000", ten_mon_an: "Xôi gà", hinh_anh: "" },
  { gia: "45000", ten_mon_an: "Lẩu thái", hinh_anh: "" },
  { gia: "30000", ten_mon_an: "Bún bò Huế", hinh_anh: "" },
  { gia: "25000", ten_mon_an: "Bánh xèo", hinh_anh: "" },
  { gia: "35000", ten_mon_an: "Gỏi cuốn tôm thịt", hinh_anh: "" },
  { gia: "28000", ten_mon_an: "Cơm chiên dương châu", hinh_anh: "" },
  { gia: "32000", ten_mon_an: "Mì xào hải sản", hinh_anh: "" },
  { gia: "18000", ten_mon_an: "Chè ba màu", hinh_anh: "" },
  { gia: "22000", ten_mon_an: "Bánh flan", hinh_anh: "" },
  { gia: "40000", ten_mon_an: "Bò kho bánh mì", hinh_anh: "" },
  { gia: "30000", ten_mon_an: "Hủ tiếu nam vang", hinh_anh: "" },
  { gia: "25000", ten_mon_an: "Cao lầu", hinh_anh: "" },
  { gia: "35000", ten_mon_an: "Gà nướng cơm lam", hinh_anh: "" },
  { gia: "15000", ten_mon_an: "Trà sữa trân châu", hinh_anh: "" }
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