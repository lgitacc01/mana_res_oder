const Menu = require('../models/Menu');
console.log('menuController loaded'); // Log khi file được import

exports.getAllMenus = async (req, res) => {
  console.log('GET /api/menu called'); // Log khi hàm được gọi
  try {
    const menus = await Menu.find();
    console.log('Menus retrieved:', menus);
    res.json(menus);
  } catch (err) {
    console.error('Error in getAllMenus:', err.message);
    res.status(500).json({ message: err.message });
  }
};

exports.createMenu = async (req, res) => {
  console.log('POST /api/menu called, req.body:', req.body);
  if (!req.body.gia || !req.body.ten_mon_an) {
    return res.status(400).json({ message: 'Vui lòng cung cấp gia và ten_mon_an' });
  }
  const menu = new Menu({
    gia: req.body.gia,
    ten_mon_an: req.body.ten_mon_an,
  });
  try {
    const newMenu = await menu.save();
    console.log('Menu saved:', newMenu);
    res.status(201).json(newMenu);
  } catch (err) {
    console.error('Error in createMenu:', err.message);
    res.status(400).json({ message: err.message });
  }
};