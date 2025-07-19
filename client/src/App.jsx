// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import BookMeal from './pages/BookMeal';
import Login from './pages/Login';
import About from './pages/About';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import Manager from './pages/Manager';
import PrivateRoute from './pages/PrivateRoute';
import ManagerRoute from './pages/ManagerRoute';

const App = () => {
  return (
    <Router>
      <Navbar />
      <main className="max-w-5xl mx-auto mt-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book" element={
  <PrivateRoute>
    <BookMeal />
  </PrivateRoute>
} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/manager" element={
  <ManagerRoute>
    <Manager />
  </ManagerRoute>
} />

        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
