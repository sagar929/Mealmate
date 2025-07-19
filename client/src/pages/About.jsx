import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 py-12 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-green-700 mb-4">👋 Welcome to MealMate</h2>
        <p className="text-gray-700 text-lg">
          We're on a mission to help campuses reduce food waste and improve the dining experience for day scholars.
          MealMate allows students to <strong>pre-book meals</strong>, ensuring no food goes to waste and no one goes hungry.
        </p>
      </div>

      {/* Why MealMate Section */}
      <div className="max-w-6xl mx-auto mt-12 grid md:grid-cols-2 gap-8 text-gray-800">
        <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition duration-300">
          <h3 className="text-2xl font-semibold text-green-700 mb-3">💡 Why MealMate?</h3>
          <p>
            MealMate is built specifically for <strong>day scholars</strong> who often skip meals due to last-minute decisions
            or food shortages. It also assists <strong>mess managers</strong> in planning meals efficiently.
          </p>
          <ul className="list-disc list-inside mt-4 text-sm text-gray-700">
            <li>Reduces food wastage by tracking actual bookings</li>
            <li>Saves time for students and mess staff</li>
            <li>Encourages sustainable campus practices</li>
          </ul>
        </div>

        <div className="bg-green-50 rounded-xl p-6 shadow-md hover:shadow-lg transition duration-300">
          <h3 className="text-2xl font-semibold text-green-700 mb-3">🌱 Our Mission</h3>
          <p>
            To create a smarter, eco-friendly meal system that empowers both students and staff through
            smart planning, easy access, and tech-driven convenience.
          </p>
        </div>
      </div>

      {/* Key Features Section */}
      <div className="max-w-6xl mx-auto mt-16 text-center">
        <h3 className="text-3xl font-bold text-green-700 mb-8">🚀 Core Features</h3>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 px-4">
          {[
            {
              title: '🔐 Secure Login/Signup',
              desc: 'Easy and secure authentication to access your meal booking dashboard.',
            },
            {
              title: '📅 Real-Time Booking',
              desc: 'Book meals for the current day only. Avoid confusion and plan your day better.',
            },
            {
              title: '💳 Online Payments',
              desc: 'No more cash hassle! Pay instantly for your meal and get confirmation.',
            },
            {
              title: '📊 Manager Dashboard',
              desc: 'Mess managers get a filtered view of bookings to prepare meals accordingly.',
            },
            {
              title: '⏱️ Save Time',
              desc: 'Quick scan at entry with no wait time or manual registers.',
            },
            {
              title: '🌍 Eco Friendly',
              desc: 'Supports sustainable goals by cutting down unnecessary food and water waste.',
            },
          ].map((f, i) => (
            <div key={i} className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition transform hover:scale-105">
              <h4 className="text-xl font-semibold text-green-700 mb-2">{f.title}</h4>
              <p className="text-gray-700 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center mt-20">
        <h3 className="text-2xl font-bold text-green-700 mb-4">Want to experience the difference?</h3>
        <Link
          to="/book"
          className="inline-block bg-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700 shadow-lg transition duration-300"
        >
          🎯 Book Your Meal Now
        </Link>
      </div>
    </div>
  );
};

export default About;
