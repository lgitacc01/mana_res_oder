import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig";

function BookingList() {
  const [bookings, setBookings] = useState([]);
  const [editing, setEditing] = useState(null); // booking đang chỉnh sửa
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    guests: "",
    note: "",
  });

  // 🔹 Lấy danh sách từ server
  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await api.get("/api/bookings");
      setBookings(res.data);
    } catch (err) {
      console.error("Lỗi khi tải danh sách:", err);
    }
  };

  // 🔹 Khi bấm "Sửa"
  const handleEdit = (booking) => {
    setEditing(booking._id);
    setFormData({
      name: booking.name,
      phone: booking.phone,
      date: booking.date,
      time: booking.time,
      guests: booking.guests,
      note: booking.note,
    });
  };

  // 🔹 Cập nhật dữ liệu form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 Lưu chỉnh sửa
  const handleSave = async (id) => {
    try {
      await api.put(`/api/bookings/${id}`, formData);
      setEditing(null);
      fetchBookings(); // cập nhật lại danh sách
    } catch (err) {
      console.error("Lỗi khi cập nhật:", err);
    }
  };

  // 🔹 Xóa đặt bàn
  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa đặt bàn này không?")) return;
    try {
      await api.delete(`/api/bookings/${id}`);
      setBookings((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      console.error("Lỗi khi xóa:", err);
    }
  };

  return (
    <div className="flex justify-center px-2 sm:px-4 md:px-8 lg:px-12 py-6">
      <div className="w-full max-w-6xl bg-white shadow-2xl rounded-2xl p-4 sm:p-6 md:p-8 border border-gray-100">
        <h2 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-2 text-[#2563eb]">
          📋 Danh sách đặt bàn
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg text-sm md:text-base text-left">
            <thead className="bg-[#2563eb] text-white">
              <tr>
                <th className="p-3 md:p-4">Tên khách</th>
                <th className="p-3 md:p-4">SĐT</th>
                <th className="p-3 md:p-4">Ngày</th>
                <th className="p-3 md:p-4">Giờ</th>
                <th className="p-3 md:p-4 text-center">Số khách</th>
                <th className="p-3 md:p-4">Ghi chú</th>
                <th className="p-3 md:p-4 text-center">Hành động</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((b) => (
                <tr
                  key={b._id}
                  className="border-t hover:bg-gray-50 transition-colors duration-200"
                >
                  {editing === b._id ? (
                    <>
                      <td className="p-3 md:p-4">
                        <input
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="border rounded px-2 py-1 w-full"
                        />
                      </td>
                      <td className="p-3 md:p-4">
                        <input
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="border rounded px-2 py-1 w-full"
                        />
                      </td>
                      <td className="p-3 md:p-4">
                        <input
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleChange}
                          className="border rounded px-2 py-1 w-full"
                        />
                      </td>
                      <td className="p-3 md:p-4">
                        <input
                          type="time"
                          name="time"
                          value={formData.time}
                          onChange={handleChange}
                          className="border rounded px-2 py-1 w-full"
                        />
                      </td>
                      <td className="p-3 md:p-4 text-center">
                        <input
                          type="number"
                          name="guests"
                          value={formData.guests}
                          onChange={handleChange}
                          className="border rounded px-2 py-1 w-20 text-center"
                        />
                      </td>
                      <td className="p-3 md:p-4">
                        <input
                          name="note"
                          value={formData.note}
                          onChange={handleChange}
                          className="border rounded px-2 py-1 w-full"
                        />
                      </td>
                      <td className="p-3 md:p-4 flex gap-2 justify-center">
                        <button
                          onClick={() => handleSave(b._id)}
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg font-medium transition"
                        >
                          💾 Lưu
                        </button>
                        <button
                          onClick={() => setEditing(null)}
                          className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded-lg font-medium transition"
                        >
                          ❌ Hủy
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="p-3 md:p-4 font-medium">{b.name}</td>
                      <td className="p-3 md:p-4">{b.phone}</td>
                      <td className="p-3 md:p-4">{b.date}</td>
                      <td className="p-3 md:p-4">{b.time}</td>
                      <td className="p-3 md:p-4 text-center">{b.guests}</td>
                      <td className="p-3 md:p-4 italic text-gray-700">
                        {b.note}
                      </td>
                      <td className="p-3 md:p-4 flex flex-col sm:flex-row gap-2 justify-center">
                        <button
                          onClick={() => handleEdit(b)}
                          className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-lg font-medium transition w-full sm:w-auto"
                        >
                          ✏️ Sửa
                        </button>
                        <button
                          onClick={() => handleDelete(b._id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg font-medium transition w-full sm:w-auto"
                        >
                          🗑️ Xóa
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default BookingList;
