import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NavbarContainer = styled(motion.nav)`
  width: 100%;
  padding: 15px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(10, 10, 10, 0.9);
  backdrop-filter: blur(10px);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
`;

const Logo = styled(motion.div)`
  font-size: 24px;
  font-weight: bold;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 2px;
  cursor: pointer;
`;

const NavLinks = styled.ul`
  list-style: none;
  display: flex;
  gap: 20px;
`;

const NavLink = styled(motion.li)`
  font-size: 18px;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    color: #ff4c29;
    transform: scale(1.1);
  }
`;

const navVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Navbar = () => {
  return (
    <NavbarContainer initial="hidden" animate="visible" variants={navVariants}>
      <Logo whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        Eternal Shadow
      </Logo>
      <NavLinks>
        <Link to="/" style={{ textDecoration: "none" }}>
          <NavLink whileHover={{ y: -5 }} whileTap={{ scale: 0.9 }}>Home</NavLink>
        </Link>
        <Link to="/gallery" style={{ textDecoration: "none" }}>
          <NavLink whileHover={{ y: -5 }} whileTap={{ scale: 0.9 }}>Gallery</NavLink>
        </Link>
        <Link to="/videos" style={{ textDecoration: "none" }}>
          <NavLink whileHover={{ y: -5 }} whileTap={{ scale: 0.9 }}>Videos</NavLink>
        </Link>
        <Link to="/downloads" style={{ textDecoration: "none" }}>
          <NavLink whileHover={{ y: -5 }} whileTap={{ scale: 0.9 }}>Downloads</NavLink>
        </Link>
      </NavLinks>
    </NavbarContainer>
  );
};

export default Navbar;
