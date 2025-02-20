import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaTimes, FaBars, FaHome, FaImages, FaVideo, FaDownload, FaInfoCircle, FaSearch } from "react-icons/fa";

const MenuContainer = styled.div`
  position: fixed;
  top: 0;
  right: ${({ open }) => (open ? "0" : "-300px")};
  width: 280px;
  height: 100vh;
  background: rgba(15, 15, 15, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: -4px 0 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 80px;
  transition: right 0.4s ease-in-out;
  z-index: 1000;
`;

const MenuIcon = styled(FaBars)`
  position: fixed;
  top: 20px;
  right: 20px;
  font-size: 28px;
  color: white;
  cursor: pointer;
  z-index: 1100;
`;

const CloseIcon = styled(FaTimes)`
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 28px;
  color: white;
  cursor: pointer;
`;

const MenuItem = styled(Link)`
  width: 80%;
  padding: 12px;
  color: white;
  text-decoration: none;
  font-size: 18px;
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: 5px;
  transition: all 0.3s ease;
  &:hover {
    background: #ff4c29;
    transform: scale(1.05);
  }
`;

const Menu = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <MenuIcon onClick={() => setOpen(true)} />
      <MenuContainer open={open}>
        <CloseIcon onClick={() => setOpen(false)} />
        <MenuItem to="/" onClick={() => setOpen(false)}>
          <FaHome /> Accueil
        </MenuItem>
        <MenuItem to="/gallery" onClick={() => setOpen(false)}>
          <FaImages /> Galerie
        </MenuItem>
        <MenuItem to="/videos" onClick={() => setOpen(false)}>
          <FaVideo /> Vidéos
        </MenuItem>
        <MenuItem to="/download" onClick={() => setOpen(false)}>
          <FaDownload /> Téléchargements
        </MenuItem>
        <MenuItem to="/about" onClick={() => setOpen(false)}>
          <FaInfoCircle /> À propos
        </MenuItem>
      </MenuContainer>
    </>
  );
};

export default Menu;
