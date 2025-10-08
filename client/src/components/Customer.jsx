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
      const res = await axios.get("http://localhost:5000/api/customers");
      setCustomers(res.data);
    } catch (err) {
      console.error("Lỗi khi tải khách hàng:", err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-blue-700 text-center">
        Danh sách khách hàng
      </h2>

      {customers.length === 0 ? (
        <p className="text-center text-gray-500">Chưa có khách hàng nào</p>
      ) : (
        <table className="w-full border border-gray-200">
          <thead className="bg-blue-100">
            <tr>
              <th className="border px-4 py-2">Tên</th>
              <th className="border px-4 py-2">SĐT</th>
              <th className="border px-4 py-2">Email</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c._id} className="text-center hover:bg-gray-50">
                <td className="border px-4 py-2">{c.name}</td>
                <td className="border px-4 py-2">{c.phone}</td>
                <td className="border px-4 py-2">{c.email || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Customer;
