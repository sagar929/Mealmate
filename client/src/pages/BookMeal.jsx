import React, { useState } from 'react';
import { useAuth } from '../Context/AuthContext';
import { Navigate } from 'react-router-dom'; // Import Navigate
import axios from 'axios';

const BookMeal = () => {
  const [mealType, setMealType] = useState('');
  const today = new Date().toISOString().split('T')[0];
  const { user, token } = useAuth();

  // 🚫 If not logged in, redirect to login page
  if (!user || !token) {
    return <Navigate to="/login" />;
  }


const handlePayment = async (e) => {
  e.preventDefault();
  if (!mealType) {
    alert("Please select a meal type!");
    return;
  }
  // 1. Create order on backend
  const { data } = await axios.post("http://localhost:9000/api/payment/create-order", { mealType });

  // 2. Open Razorpay checkout
  const options = {
    key: "rzp_test_Hj49BMrOeHgiKn",
    amount: data.amount,
    currency: data.currency,
    order_id: data.orderId,
    // this is called when payment is successful
    // we will save the booking in backend
    handler: async function (response) {
      alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
      // Save booking in backend
      try {
        await axios.post(
          "http://localhost:9000/api/user/book-meal",
          {
            mealType,
            date: new Date().toISOString().split('T')[0],
            paymentId: response.razorpay_payment_id,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } catch (err) {
        alert("Booking save failed: " + (err.response?.data?.message || "Unknown error"));
      }
    },
    prefill: {
      name: user?.name || "",
      email: user?.usermail || "",
    },
    theme: { color: "#3399cc" },
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (!mealType) {
  //     alert('Please select a meal type!');
  //     return;
  //   }
  //   alert(`Meal Booked!\nDate: ${today}\nMeal: ${mealType}`);
  // };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl p-8 sm:p-10 transition duration-500 hover:shadow-green-300">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-green-700 mb-6 animate-fade-in-down">
          🥗 Book Your Meal Today!
        </h2>
        <p className="text-gray-600 text-center mb-8">
          Choose your preferred meal for <span className="font-semibold text-green-700">{today}</span> and help reduce food waste. 🍽️
        </p>

        <form  className="space-y-6">
          <div className="flex flex-col">
            <label htmlFor="mealDate" className="text-gray-700 font-medium mb-2">
              Meal Date
            </label>
            <input
              type="text"
              id="mealDate"
              value={today}
              readOnly
              className="p-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-600 cursor-not-allowed"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="mealType" className="text-gray-700 font-medium mb-2">
              Meal Type
            </label>
            <select
              id="mealType"
              value={mealType}
              onChange={(e) => setMealType(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 transition"
            >
              <option value="">🍽️ Select Meal Type</option>
              <option value="breakfast">🍳 Breakfast</option>
              <option value="lunch">🍛 Lunch</option>
              <option value="dinner">🍲 Dinner</option>
            </select>
          </div>

          <div className="text-center">
            <button
              type="submit"
              onClick={handlePayment}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-transform duration-300 transform hover:scale-105"
            >
              Confirm & Pay
            </button>
          </div>
        </form>

        <p className="mt-8 text-center text-sm text-gray-500">
          You’re just one step away from a tasty, zero-waste meal. 🌿
        </p>
      </div>
    </div>
  );
};

export default BookMeal;
