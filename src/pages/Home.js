import React from "react";
import HeroSection from "../components/HeroSection";
import AnimatedButton from "../components/AnimatedButton";
import { motion } from "framer-motion";
import styled from "styled-components";
import { Link } from "react-router-dom";

const HomeContainer = styled(motion.div)`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #0f0f0f, #1a1a1a);
  color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 20px;
`;

const ContentWrapper = styled.div`
  text-align: center;
  max-width: 900px;
`;

const Title = styled(motion.h1)`
  font-size: 3rem;
  font-weight: bold;
  background: linear-gradient(90deg, #ff416c, #ff4b2b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 20px;
`;

const Subtitle = styled(motion.p)`
  font-size: 1.5rem;
  opacity: 0.8;
  max-width: 800px;
  margin: 0 auto 20px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 30px;
  flex-wrap: wrap;
  justify-content: center;
`;

const StyledButton = styled(Link)`
  background: #ff4b2b;
  color: white;
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 1.2rem;
  text-decoration: none;
  transition: all 0.3s ease;
  &:hover {
    background: #ff416c;
    transform: scale(1.05);
  }
`;

const Home = () => {
  return (
    <HomeContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <HeroSection />

      <ContentWrapper>
        <Title
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Bienvenue sur Eternal Shadow Nexus
        </Title>
        <Subtitle
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          Le site ultime pour les passionnés d’anime, manga et high-tech.
        </Subtitle>

        <ButtonWrapper>
          <StyledButton to="/gallery">Voir la Galerie</StyledButton>
          <StyledButton to="/videos">Regarder des Vidéos</StyledButton>
          <StyledButton to="/download">Téléchargements</StyledButton>
          <StyledButton to="/about">À propos</StyledButton>
        </ButtonWrapper>
      </ContentWrapper>
    </HomeContainer>
  );
};

export default Home;
