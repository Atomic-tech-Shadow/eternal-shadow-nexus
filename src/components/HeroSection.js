import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import gsap from "gsap";

const HeroContainer = styled.section`
  width: 100%;
  height: 100vh;
  background: url("/assets/hero-bg.jpg") center/cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  text-align: center;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
`;

const HeroContent = styled(motion.div)`
  z-index: 2;
  color: white;
  max-width: 800px;
  padding: 20px;
`;

const Title = styled(motion.h1)`
  font-size: 3rem;
  font-weight: bold;
  text-transform: uppercase;
  background: linear-gradient(90deg, #ff4c29, #ff007f);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled(motion.p)`
  font-size: 1.5rem;
  margin-top: 10px;
  opacity: 0.8;
`;

const Button = styled(motion.a)`
  display: inline-block;
  margin-top: 20px;
  padding: 12px 24px;
  font-size: 1.2rem;
  font-weight: bold;
  text-transform: uppercase;
  color: white;
  background: #ff4c29;
  border-radius: 5px;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background: #ff007f;
    transform: scale(1.1);
  }
`;

const HeroSection = () => {
  const titleRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
    );
  }, []);

  return (
    <HeroContainer>
      <Overlay />
      <HeroContent
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Title ref={titleRef}>Eternal Shadow Nexus</Title>
        <Subtitle>Plongez dans l'univers ultime de l'anime et de la technologie</Subtitle>
        <Button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} href="#explore">
          Explorer
        </Button>
      </HeroContent>
    </HeroContainer>
  );
};

export default HeroSection;
