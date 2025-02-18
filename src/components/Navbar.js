import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const NavbarContainer = styled.nav`
  width: 100%;
  height: 60px;
  background: rgba(10, 10, 10, 0.9);
  backdrop-filter: blur(10px);
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  letter-spacing: 1px;
`;

const MenuIcon = styled.div`
  font-size: 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    transform: scale(1.1);
  }
`;

const MenuContainer = styled(motion.div)`
  position: absolute;
  top: 60px;
  right: 0;
  width: 250px;
  background: rgba(15, 15, 15, 0.95);
  backdrop-filter: blur(15px);
  border-left: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px 0 0 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const MenuItem = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  &:hover {
    color: #ff4c29;
    transform: scale(1.05);
  }
`;

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <NavbarContainer>
      <Logo>Eternal Shadow Nexus</Logo>
      <MenuIcon onClick={() => setMenuOpen(!menuOpen)}>☰</MenuIcon>

      <AnimatePresence>
        {menuOpen && (
          <MenuContainer
            initial={{ x: 250, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 250, opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <MenuItem to="/" onClick={() => setMenuOpen(false)}>Accueil</MenuItem>
            <MenuItem to="/gallery" onClick={() => setMenuOpen(false)}>Galerie</MenuItem>
            <MenuItem to="/videos" onClick={() => setMenuOpen(false)}>Vidéos</MenuItem>
            <MenuItem to="/download" onClick={() => setMenuOpen(false)}>Téléchargements</MenuItem>
            <MenuItem to="/about" onClick={() => setMenuOpen(false)}>À propos</MenuItem>
          </MenuContainer>
        )}
      </AnimatePresence>
    </NavbarContainer>
  );
};

export default Navbar;
