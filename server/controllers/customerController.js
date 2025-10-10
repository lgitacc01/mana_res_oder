const Customer = require("../models/Customer");

exports.getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find()
      .populate({
        path: "bookings",                // liên kết sang bảng Booking
        select: "date time guests note", // chỉ lấy các thông tin cần
        options: { sort: { date: -1 } }  // sắp xếp mới nhất lên đầu
      });

    res.json(customers);
  } catch (err) {
    console.error("❌ Lỗi khi lấy danh sách khách hàng:", err);
    res.status(500).json({ error: err.message });
  }
};
