const Booking = require("../models/Booking");
const Customer = require("../models/Customer");

// Lấy tất cả các đơn đặt bàn
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("customer");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Thêm đặt bàn mới (tự động xử lý khách hàng)
exports.addBooking = async (req, res) => {
    try {
    const { name, phone, email, date, time, guests, note } = req.body;

    if (!name || !phone || !date || !time) {
      return res.status(400).json({ error: "Thiếu thông tin bắt buộc." });
    }

    // 🔍 1. Tìm hoặc tạo khách hàng
    let customer = await Customer.findOne({ phone });

    if (!customer) {
      customer = await Customer.create({ name, phone, email });
      console.log("🆕 Tạo khách hàng mới:", customer.name);
    } else {
      console.log("✅ Dùng lại khách hàng:", customer.name);
    }

    // 📅 2. Tạo booking mới
    const newBooking = await Booking.create({
      customer: customer._id,
      name,
      phone,
      date,
      time,
      guests,
      note,
    });

    // 🔗 3. Cập nhật mảng bookings của khách hàng (an toàn hơn .push)
    await Customer.findByIdAndUpdate(customer._id, {
      $addToSet: { bookings: newBooking._id } // tránh trùng
    });

    res.status(201).json({
      message: "Đặt bàn thành công!",
      booking: newBooking,
      customer,
    });
  } catch (error) {
    console.error("❌ Lỗi khi thêm booking:", error);
    res.status(500).json({ error: "Lỗi server khi thêm booking" });
  }
};

// Cập nhật thông tin đặt bàn
exports.updateBooking = async (req, res) => {
  try {
    const updated = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Xóa đặt bàn
exports.deleteBooking = async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: "Xóa đặt bàn thành công" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


// Lấy lịch sử đặt bàn của 1 khách hàng
exports.getBookingsByCustomer = async (req, res) => {
  try {
    const { customerId } = req.params;
    const bookings = await Booking.find({ customer: customerId }).sort({ date: -1 });
    res.json(bookings);
  } catch (err) {
    console.error("❌ Lỗi khi tải lịch sử đặt bàn:", err);
    res.status(500).json({ error: "Không thể tải lịch sử đặt bàn" });
  }
};
