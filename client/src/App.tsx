import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FeaturedProducts from "./pages/FeaturedProducts";
import Services from "./pages/Services";
import Admin from "./pages/admin";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="text-red-500">
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/products" element={<FeaturedProducts />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
