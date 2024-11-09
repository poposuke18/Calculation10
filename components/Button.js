// components/Button.js
"use client";

import { motion } from "framer-motion";

const Button = ({ children, onClick, disabled, className = "" }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    disabled={disabled}
    className={`px-4 py-2 rounded-lg font-semibold text-white transition-colors ${className} ${
      disabled ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"
    }`}
  >
    {children}
  </motion.button>
);

export default Button;