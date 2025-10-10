// src/components/Customer.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

function Customer() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const res = await axios.get("/api/customerRoutes");
      setCustomers(res.data);
    } catch (err) {
      console.error("Lỗi khi tải khách hàng:", err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-3xl font-bold mb-6 text-blue-700 text-center">
        Danh sách khách hàng & lịch sử đặt bàn
      </h2>

      {customers.length === 0 ? (
        <p className="text-center text-gray-500">Chưa có khách hàng nào</p>
      ) : (
        customers.map((c) => (
          <div
            key={c._id}
            className="mb-8 border border-gray-200 rounded-lg overflow-hidden shadow-sm"
          >
            <div className="bg-blue-50 px-4 py-3 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-blue-800">
                  {c.name}
                </h3>
                <p className="text-sm text-gray-600">
                  📞 {c.phone} &nbsp; | &nbsp; ✉️ {c.email || "Không có email"}
                </p>
              </div>
            </div>

            {c.bookings && c.bookings.length > 0 ? (
              <table className="w-full text-sm border-t">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border px-3 py-2">Ngày</th>
                    <th className="border px-3 py-2">Giờ</th>
                    <th className="border px-3 py-2">Số khách</th>
                    <th className="border px-3 py-2">Ghi chú</th>
                  </tr>
                </thead>
                <tbody>
                  {c.bookings.map((b) => (
                    <tr key={b._id} className="text-center hover:bg-gray-50">
                      <td className="border px-3 py-2">{b.date}</td>
                      <td className="border px-3 py-2">{b.time}</td>
                      <td className="border px-3 py-2">{b.guests}</td>
                      <td className="border px-3 py-2">{b.note || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center py-3 text-gray-500">
                Chưa có lịch sử đặt bàn
              </p>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default Customer;
