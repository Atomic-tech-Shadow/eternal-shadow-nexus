import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import styled from "styled-components";

const AboutContainer = styled(motion.div)`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #0f0f0f, #1a1a1a);
  color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 80px;
`;

const Title = styled(motion.h1)`
  font-size: 2.8rem;
  font-weight: bold;
  text-align: center;
  background: linear-gradient(90deg, #ff9a9e, #fad0c4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 20px;
`;

const AboutContent = styled(motion.div)`
  width: 90%;
  max-width: 900px;
  background: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(255, 154, 158, 0.3);
  text-align: center;
  backdrop-filter: blur(10px);
`;

const Paragraph = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  color: #dddddd;
`;

const About = () => {
  return (
    <AboutContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Navbar />
      <Title
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        À propos de Eternal Shadow Nexus
      </Title>

      <AboutContent
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <Paragraph>
          Bienvenue sur <strong>Eternal Shadow Nexus</strong>, le site ultime
          dédié à l'univers des animés, des mangas et des technologies.
          <br />
          Nous offrons une expérience immersive avec des vidéos, des galeries,
          des téléchargements et bien plus encore.
        </Paragraph>
        <Paragraph>
          Notre objectif est de créer une communauté où les passionnés peuvent
          découvrir, partager et profiter du meilleur contenu avec un design
          époustouflant et une navigation fluide.
        </Paragraph>
      </AboutContent>

      <Footer />
    </AboutContainer>
  );
};

export default About;
