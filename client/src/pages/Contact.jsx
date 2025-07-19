import React from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 py-12 px-4 sm:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-green-700 mb-6">📬 Get in Touch with MealMate</h2>
        <p className="text-gray-700 text-lg mb-10">
          Have questions, or need support? We're here to help! Reach out to us anytime using the details below.
        </p>
      </div>

      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8 space-y-6 text-gray-800">
        <div className="flex items-center gap-4">
          <FaEnvelope className="text-green-600 text-2xl" />
          <div>
            <p className="font-semibold">Email</p>
            <p>support@mealmate.com</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <FaPhone className="text-green-600 text-2xl" />
          <div>
            <p className="font-semibold">Phone</p>
            <p>+91-9637878812</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <FaMapMarkerAlt className="text-green-600 text-2xl" />
          <div>
            <p className="font-semibold">Address</p>
            <p>AIT College, Pune, Maharashtra</p>
          </div>
        </div>
      </div>

      <div className="text-center mt-12">
        <p className="text-green-700 font-medium text-lg">
          We'll get back to you within 24 hours 🚀
        </p>
      </div>
    </div>
  );
};

export default Contact;
