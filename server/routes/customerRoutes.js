const express = require("express");
const { getCustomers } = require("../controllers/customerController.js");

const router = express.Router();

// chỉ cần GET để xem danh sách khách hàng
router.get("/", getCustomers);

module.exports = router;
