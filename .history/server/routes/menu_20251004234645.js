const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');

// Lấy tất cả menu
router.get('/', menuController.getAllMenus);

// Thêm menu mới
router.post('/', menuController.createMenu);

// Thêm 5 món ăn
router.post('/add', menuController.addMultipleMenus);

module.exports = router;