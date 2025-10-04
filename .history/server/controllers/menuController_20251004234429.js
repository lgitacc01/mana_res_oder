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
  if (!req.body.stt || !req.body.ten_mon) {
    return res.status(400).json({ message: 'Vui lòng cung cấp stt và ten_mon' });
  }
  if (typeof req.body.stt !== 'number') {
    return res.status(400).json({ message: 'stt phải là số' });
  }
  const menu = new Menu({
    stt: req.body.stt,
    ten_mon: req.body.ten_mon,
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

exports.addMultipleMenus = async (req, res) => {
  console.log('POST /api/menu/add called'); // Log khi hàm được gọi
  const menuData = [
    { stt: 1, ten_mon: 'Phở Bò' },
    { stt: 2, ten_mon: 'Bún Chả' },
    { stt: 3, ten_mon: 'Bánh Mì' },
    { stt: 4, ten_mon: 'Cơm Tấm' },
    { stt: 5, ten_mon: 'Bánh Xèo' },
  ];

  try {
    // Kiểm tra trùng lặp stt
    const existingMenus = await Menu.find({ stt: { $in: menuData.map(item => item.stt) } });
    if (existingMenus.length > 0) {
      return res.status(400).json({ message: 'Một số stt đã tồn tại', existing: existingMenus });
    }

    // Thêm 5 bản ghi
    const newMenus = await Menu.insertMany(menuData);
    console.log('Multiple menus saved:', newMenus);
    res.status(201).json({ message: 'Thêm 5 món ăn thành công', menus: newMenus });
  } catch (err) {
    console.error('Error in addMultipleMenus:', err.message);
    res.status(400).json({ message: err.message });
  }
};