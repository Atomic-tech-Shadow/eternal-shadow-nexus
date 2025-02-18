import React from "react";
import { motion } from "framer-motion";
import "../styles/AnimatedButton.css";

const AnimatedButton = ({ text, onClick }) => {
  return (
    <motion.button
      className="animated-button"
      whileHover={{ scale: 1.1, backgroundColor: "#ff5722", color: "#fff" }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
    >
      {text}
    </motion.button>
  );
};

export default AnimatedButton;
