import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { FaHome, FaImages, FaVideo, FaDownload, FaInfoCircle, FaBars, FaTimes, FaSearch } from "react-icons/fa";

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

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 5px 10px;
  transition: all 0.3s ease;
  &:focus-within {
    background: rgba(255, 75, 43, 0.3);
  }
`;

const SearchInput = styled.input`
  background: transparent;
  border: none;
  color: white;
  outline: none;
  padding: 5px;
  width: 150px;
  font-size: 14px;
  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
`;

const SearchIcon = styled(FaSearch)`
  color: white;
  font-size: 16px;
  margin-left: 5px;
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
  display: flex;
  align-items: center;
  gap: 10px;
  color: white;
  text-decoration: none;
  font-size: 1.2rem;
  padding: 10px;
  border-radius: 8px;
  transition: all 0.3s ease;
  &:hover {
    background: rgba(255, 75, 43, 0.2);
    color: #ff4c29;
    transform: scale(1.05);
  }
`;

const CloseIcon = styled.div`
  align-self: flex-end;
  font-size: 1.5rem;
  cursor: pointer;
`;

const Navbar = ({ onSearch }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <NavbarContainer>
      <Logo>Eternal Shadow Nexus</Logo>
      
      <RightSection>
        <SearchBox>
          <SearchInput type="text" placeholder="Rechercher..." value={query} onChange={handleSearch} />
          <SearchIcon />
        </SearchBox>

        <MenuIcon onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </MenuIcon>
      </RightSection>

      <AnimatePresence>
        {menuOpen && (
          <MenuContainer
            initial={{ x: 250, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 250, opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <CloseIcon onClick={() => setMenuOpen(false)}>
              <FaTimes />
            </CloseIcon>
            <MenuItem to="/" onClick={() => setMenuOpen(false)}>
              <FaHome /> Accueil
            </MenuItem>
            <MenuItem to="/gallery" onClick={() => setMenuOpen(false)}>
              <FaImages /> Galerie
            </MenuItem>
            <MenuItem to="/videos" onClick={() => setMenuOpen(false)}>
              <FaVideo /> Vidéos
            </MenuItem>
            <MenuItem to="/download" onClick={() => setMenuOpen(false)}>
              <FaDownload /> Téléchargements
            </MenuItem>
            <MenuItem to="/about" onClick={() => setMenuOpen(false)}>
              <FaInfoCircle /> À propos
            </MenuItem>
          </MenuContainer>
        )}
      </AnimatePresence>
    </NavbarContainer>
  );
};

export default Navbar;
