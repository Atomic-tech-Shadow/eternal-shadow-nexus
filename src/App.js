import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import Videos from "./pages/Videos";
import Download from "./pages/Download";
import About from "./pages/About";
import "./styles/global.css";

const pageVariants = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeInOut" } },
  exit: { opacity: 0, x: 50, transition: { duration: 0.5, ease: "easeInOut" } },
};

function AnimatedRoutes({ searchQuery }) {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname} variants={pageVariants} initial="initial" animate="animate" exit="exit">
        <Routes>
          <Route path="/" element={<Home searchQuery={searchQuery} />} />
          <Route path="/gallery" element={<Gallery searchQuery={searchQuery} />} />
          <Route path="/videos" element={<Videos searchQuery={searchQuery} />} />
          <Route path="/download" element={<Download searchQuery={searchQuery} />} />
          <Route path="/about" element={<About searchQuery={searchQuery} />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Router>
      <Navbar setSearchQuery={setSearchQuery} />
      <div className="content">
        <AnimatedRoutes searchQuery={searchQuery} />
      </div>
      <Footer />
    </Router>
  );
}

export default App;
