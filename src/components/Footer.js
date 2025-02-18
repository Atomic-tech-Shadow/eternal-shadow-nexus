import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const FooterContainer = styled(motion.footer)`
  width: 100%;
  background: rgba(10, 10, 10, 0.9);
  backdrop-filter: blur(10px);
  color: white;
  padding: 20px 0;
  text-align: center;
  position: relative;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 10px;
`;

const Icon = styled(motion.a)`
  font-size: 24px;
  color: #fff;
  transition: all 0.3s ease;

  &:hover {
    color: #ff4c29;
    transform: scale(1.2);
  }
`;

const Copyright = styled.p`
  font-size: 14px;
  opacity: 0.7;
  margin-top: 10px;
`;

const Footer = () => {
  return (
    <FooterContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <p>© {new Date().getFullYear()} Eternal Shadow Nexus. Tous droits réservés.</p>
      <SocialIcons>
        <Icon href="#" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
          🐦
        </Icon>
        <Icon href="#" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
          📘
        </Icon>
        <Icon href="#" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
          📷
        </Icon>
      </SocialIcons>
      <Copyright>Designed with ❤️ by Eternal Shadow Nexus</Copyright>
    </FooterContainer>
  );
};

export default Footer;
