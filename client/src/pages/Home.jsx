import React from 'react';
import { useNavigate } from 'react-router-dom';
import{useAuth} from '../Context/AuthContext'
import BookMeal from './BookMeal';

const Home = () => {
  const navigate = useNavigate();
  const { user, token } = useAuth();
  
  const handleBookNow =()=>{
    if(user && token){
      navigate('/book');
    } else{
      navigate('/login');
    }
  }

  return (
    <div>

      {/* Hero Section with CTA */}
      <section className="bg-green-50 py-12 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-extrabold text-green-700 mb-4">
            Welcome to MealMate 🍽️
          </h2>
          <p className="text-gray-700 text-lg mb-6">
            Simplifying mess meals for day scholars. Book your meals in advance and help reduce food wastage while enjoying hassle-free service.
          </p>
          <button onClick={()=>{
                handleBookNow();
            // Navigate('/book');
          }} className="bg-green-600 text-white px-6 py-2 rounded-full shadow hover:bg-green-700 transition duration-300 cursor-pointer">
            Book Now
          </button>
        </div>
      </section>

      {/* Cards Section */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Create Account 🧑‍💻", desc: "Sign up as a day scholar and get started instantly." },
            { title: "Login 🔐", desc: "Access your dashboard and meal bookings easily." },
            { title: "Book Your Meal 🍱", desc: "Reserve your breakfast, lunch, or dinner ahead of time." },
            { title: "No More Waiting ⏰", desc: "Meals ready when you arrive — skip the mess queues!" },
            { title: "Smart Meal Planning 🧠", desc: "Cook only what's needed. Save food. Save money." },
            { title: "Enjoy Your Meal 😋", desc: "Come in, show your booking, and eat stress-free!" },
          ].map((card, i) => (
            <div key={i} className="bg-green-100 rounded-xl shadow-md p-6 text-center hover:scale-105 transition-transform duration-300">
              <h3 className="text-xl font-bold mb-2 text-green-700">{card.title}</h3>
              <p className="text-gray-600">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="bg-green-50 py-12 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <blockquote className="italic text-gray-600 text-lg border-l-4 border-green-500 pl-4">
            “Thanks to MealMate, I never have to worry about missing meals or wasting food. It’s fast, simple, and sustainable.”
          </blockquote>
          <p className="mt-2 text-green-700 font-semibold">– A Happy Day Scholar</p>
        </div>
      </section>

      
    </div>
  );
};

export default Home;
