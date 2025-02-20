import React from "react";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 1 } },
};

const backgroundAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const HeroContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(-45deg, #0f0f0f, #1a1a1a, #222, #333);
  background-size: 300% 300%;
  animation: ${backgroundAnimation} 10s ease infinite;
  color: white;
  text-align: center;
`;

const Title = styled(motion.h1)`
  font-size: 3.5rem;
  font-weight: bold;
  background: linear-gradient(90deg, #ff416c, #ff4b2b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 20px;
`;

const Subtitle = styled(motion.p)`
  font-size: 1.5rem;
  opacity: 0.9;
  max-width: 800px;
  margin: 0 auto;
`;

const Button = styled(motion.a)`
  display: inline-block;
  margin-top: 30px;
  padding: 12px 30px;
  font-size: 1.2rem;
  font-weight: bold;
  color: white;
  background: linear-gradient(45deg, #ff416c, #ff4b2b);
  border-radius: 50px;
  text-decoration: none;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0px 4px 15px rgba(255, 75, 43, 0.3);
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 6px 20px rgba(255, 75, 43, 0.5);
  }
`;

const HeroSection = () => {
  return (
    <HeroContainer>
      <Title variants={fadeIn} initial="hidden" animate="visible">
        Bienvenue sur Eternal Shadow Nexus
      </Title>
      <Subtitle variants={fadeIn} initial="hidden" animate="visible" transition={{ delay: 0.3 }}>
        L’univers ultime des passionnés d’anime, manga et high-tech.
      </Subtitle>
      <Button
        href="/explore"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.6 }}
      >
        Explorer
      </Button>
    </HeroContainer>
  );
};

export default HeroSection;
