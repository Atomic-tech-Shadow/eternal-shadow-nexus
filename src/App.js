import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import Videos from "./pages/Videos";
import Download from "./pages/Download";
import About from "./pages/About";
import AnimatedButton from "./components/AnimatedButton";
import "./styles/global.css";

const pageVariants = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeInOut" } },
  exit: { opacity: 0, x: 50, transition: { duration: 0.5, ease: "easeInOut" } },
};

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname} variants={pageVariants} initial="initial" animate="animate" exit="exit">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/download" element={<Download />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <div className="content">
        <AnimatedRoutes />
        <div style={{ textAlign: "center", margin: "20px 0" }}>
          <AnimatedButton text="Clique ici" onClick={() => alert("Bouton cliqué !")} />
        </div>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
