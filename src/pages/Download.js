import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import styled from "styled-components";

const DownloadContainer = styled(motion.div)`
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
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
  background: linear-gradient(90deg, #ff9a9e, #fad0c4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 20px;
`;

const DownloadList = styled.div`
  width: 90%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
`;

const DownloadCard = styled(motion.div)`
  background: #222;
  padding: 15px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 4px 10px rgba(255, 154, 158, 0.3);
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const FileInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const FileTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: bold;
  color: #ffffff;
`;

const FileSize = styled.p`
  font-size: 0.9rem;
  color: #bbbbbb;
`;

const DownloadButton = styled(motion.a)`
  background: linear-gradient(90deg, #ff416c, #ff4b2b);
  padding: 10px 15px;
  border-radius: 5px;
  color: white;
  text-decoration: none;
  font-weight: bold;
  transition: background 0.3s;

  &:hover {
    background: linear-gradient(90deg, #ff4b2b, #ff416c);
  }
`;

const Download = () => {
  const [files] = useState([
    { name: "Application Eternal Shadow Nexus", size: "50MB", link: "#" },
    { name: "Fond d'écran Anime", size: "5MB", link: "#" },
    { name: "Vidéo exclusive", size: "200MB", link: "#" },
  ]);

  return (
    <DownloadContainer
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
        Téléchargements
      </Title>

      <DownloadList>
        {files.map((file, index) => (
          <DownloadCard
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <FileInfo>
              <FileTitle>{file.name}</FileTitle>
              <FileSize>Taille: {file.size}</FileSize>
            </FileInfo>
            <DownloadButton href={file.link} target="_blank">
              Télécharger
            </DownloadButton>
          </DownloadCard>
        ))}
      </DownloadList>

      <Footer />
    </DownloadContainer>
  );
};

export default Download;
