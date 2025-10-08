const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" }, // có thể rỗng nếu khách chưa lưu
  name: { type: String, required: true },  // tên khách hàng tại thời điểm đặt bàn
  phone: { type: String, required: true }, // số điện thoại để nhận diện
  date: { type: String, required: true },
  time: { type: String, required: true },
  guests: { type: Number, required: true },
  note: String,
});

module.exports = mongoose.model("Booking", bookingSchema);
