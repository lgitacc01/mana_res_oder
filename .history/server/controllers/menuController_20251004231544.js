const Menu = require('../models/Menu');

exports.getAllMenus = async (req, res) => {
  try {
    const menus = await Menu.find();
    res.json(menus);
    console.log("1")
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createMenu = async (req, res) => {
  const menu = new Menu({
    stt: req.body.stt,
    ten_mon: req.body.ten_mon,
  });
  try {
    const newMenu = await menu.save();
    res.status(201).json(newMenu);
    console.log("1")
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};