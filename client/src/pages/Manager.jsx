import React, { useEffect, useState } from "react";
import axios from "axios";

const Manager = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [today, setToday] = useState("");

  useEffect(() => {
    // Set today's date in format: YYYY-MM-DD
    const date = new Date();
    setToday(date.toLocaleDateString("en-CA")); // "en-CA" gives YYYY-MM-DD
  }, []);

  // Fetch paid users from backend
  useEffect(() => {
    const fetchPaidUsers = async () => {
      try {
        // Replace with your actual API endpoint
       const res = await axios.get("http://localhost:9000/api/user/paid-users");
setUsers(res.data || []);
      } catch (err) {
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPaidUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl p-8 sm:p-10">
        <div className="text-right text-green-600 font-semibold mb-2 text-lg">
          {today}
        </div>
        <h2 className="text-3xl font-extrabold text-center text-green-700 mb-8">
          🍽️ Paid Meal Bookings
        </h2>
        {loading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : users.length === 0 ? (
          <div className="text-center text-gray-500">No paid users found.</div>
        ) : (
          <>
            <table className="w-full mb-6 border border-green-200 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-green-100 text-green-800">
                  <th className="py-2 px-4">Name</th>
                  <th className="py-2 px-4">Email</th>
                  <th className="py-2 px-4">Branch</th>
                  <th className="py-2 px-4">Role</th>
                </tr>
              </thead>
              <tbody>
                {(Array.isArray(users) ? users : []).map((u, i) => (
                  <tr key={u._id || i} className="border-t">
                    <td className="py-2 px-4">{u.name}</td>
                    <td className="py-2 px-4">{u.usermail}</td>
                    <td className="py-2 px-4">{u.branch}</td>
                    <td className="py-2 px-4 capitalize">{u.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="text-right font-bold text-green-700 text-lg">
              Total Paid Users: {Array.isArray(users) ? users.length : 0}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Manager;