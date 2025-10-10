import React, { useState } from "react";
import axios from "axios";
import BookingList from "./BookingList";
import { CalendarPlus, List } from "lucide-react";
import api from "../api/axiosConfig";

function Booking() {
  const [activeTab, setActiveTab] = useState("form");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    time: "",
    guests: "",
    note: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://3.0.20.232/api/bookings", formData);
      setMessage("✅ " + res.data.message);
      setFormData({
        name: "",
        phone: "",
        email: "",
        date: "",
        time: "",
        guests: "",
        note: "",
      });
    } catch (err) {
      console.error(err);
      setMessage("❌ Lỗi khi đặt bàn!");
    }
  };

  return (
  <div className="max-w-7xl mx-auto bg-white shadow-2xl rounded-2xl p-8 mt-6 border border-gray-100 text-gray-800 dark:text-gray">
    <div className="flex justify-center gap-4 mb-6">
      <button
        onClick={() => setActiveTab("form")}
        className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
          activeTab === "form"
            ? "bg-blue-600 text-white shadow-md"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        <CalendarPlus size={18} /> Đặt bàn mới
      </button>

      <button
        onClick={() => setActiveTab("list")}
        className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
          activeTab === "list"
            ? "bg-blue-600 text-white shadow-md"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        <List size={18} /> Danh sách đặt bàn
      </button>
    </div>

    {activeTab === "form" ? (
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Tên khách hàng"
          value={formData.name}
          onChange={handleChange}
          required
          className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
        />
        <input
          type="text"
          name="phone"
          placeholder="Số điện thoại"
          value={formData.phone}
          onChange={handleChange}
          required
          className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
        />
        <input
          type="email"
          name="email"
          placeholder="Email (tuỳ chọn)"
          value={formData.email}
          onChange={handleChange}
          className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
        />
        <input
          type="number"
          name="guests"
          placeholder="Số khách"
          value={formData.guests}
          onChange={handleChange}
          required
          className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
        />
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
          className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
        />
        <textarea
          name="note"
          placeholder="Ghi chú (nếu có)"
          value={formData.note}
          onChange={handleChange}
          className="border rounded-lg p-3 md:col-span-2 focus:ring-2 focus:ring-blue-400 outline-none"
        ></textarea>

        <button
          type="submit"
          className="md:col-span-2 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Gửi đặt bàn
        </button>
        {message && (
          <p className="md:col-span-2 text-center text-green-600 font-medium">
            {message}
          </p>
        )}
      </form>
    ) : (
      <BookingList />
    )}
  </div>
);

}

export default Booking;
