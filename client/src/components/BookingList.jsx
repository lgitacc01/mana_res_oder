import React, { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import api from "../api/axiosConfig";

function BookingList() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await api.get("/api/bookings");
        setBookings(res.data);
      } catch (err) {
        console.error("Lỗi khi tải danh sách:", err);
      }
    };
    fetchBookings();
  }, []);

  return (
    <div className="flex justify-center px-2 sm:px-4 md:px-8 lg:px-12 py-6">
    <div className="w-full max-w-6xl bg-white shadow-2xl rounded-2xl p-4 sm:p-6 md:p-8 border border-gray-100">
      <h2 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-2 text-[#2563eb]">
        <span role="img" aria-label="list">📋</span> Danh sách đặt bàn
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
            {bookings.map((b, index) => (
              <tr
                key={index}
                className="border-t hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="p-3 md:p-4 font-medium">{b.name}</td>
                <td className="p-3 md:p-4">{b.phone}</td>
                <td className="p-3 md:p-4">{b.date}</td>
                <td className="p-3 md:p-4">{b.time}</td>
                <td className="p-3 md:p-4 text-center">{b.guests}</td>
                <td className="p-3 md:p-4 italic text-gray-700">{b.note}</td>
                <td className="p-3 md:p-4 flex flex-col sm:flex-row gap-2 justify-center">
                  <button className="flex items-center justify-center gap-1 bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-lg font-medium transition w-full sm:w-auto">
                    ✏️ Sửa
                  </button>
                  <button className="flex items-center justify-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg font-medium transition w-full sm:w-auto">
                    🗑️ Xoá
                  </button>
                </td>
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
