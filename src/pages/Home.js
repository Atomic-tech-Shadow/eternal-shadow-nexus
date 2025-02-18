import React from "react";
import HeroSection from "../components/HeroSection";
import AnimatedButton from "../behaviors/AnimatedButton";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import styled from "styled-components";

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
`;

const ContentWrapper = styled.div`
  text-align: center;
  max-width: 1200px;
  padding: 40px 20px;
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
  margin: 0 auto;
`;

const ButtonWrapper = styled.div`
  margin-top: 30px;
`;

const Home = () => {
  return (
    <HomeContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Navbar />
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
          <AnimatedButton text="Explorer" link="/explore" />
        </ButtonWrapper>
      </ContentWrapper>

    </HomeContainer>
  );
};

export default Home;
