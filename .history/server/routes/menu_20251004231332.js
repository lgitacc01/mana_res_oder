const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');

// Lấy tất cả menu
console.log("1")
router.get('/', menuController.getAllMenus);

// Thêm menu mới
router.post('/', menuController.createMenu);

module.exports = router;