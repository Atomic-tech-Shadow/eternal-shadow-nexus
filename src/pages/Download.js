import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import Loader from "../components/Loader";

const shimmer = keyframes`
  0% { background-position: -100% 0; }
  100% { background-position: 100% 0; }
`;

const DownloadContainer = styled(motion.div)`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #0f0f0f, #1a1a1a);
  color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 80px;
`;

const Title = styled(motion.h1)`
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
  background: linear-gradient(90deg, #ff416c, #ff4b2b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const FileGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  width: 90%;
  max-width: 1200px;
  margin-top: 30px;
`;

const FileCard = styled(motion.div)`
  background: rgba(20, 20, 20, 0.9);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.05);
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 180px;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
  background-size: 200% 100%;
  animation: ${shimmer} 2s infinite linear;
`;

const FileImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  display: block;
`;

const FileInfo = styled.div`
  padding: 15px;
`;

const FileName = styled.h2`
  font-size: 1.2rem;
  font-weight: bold;
`;

const FileSize = styled.p`
  font-size: 0.9rem;
  opacity: 0.7;
`;

const DownloadLink = styled.a`
  display: inline-block;
  margin-top: 10px;
  padding: 10px 15px;
  background: #ff4b2b;
  color: white;
  font-size: 1rem;
  text-decoration: none;
  border-radius: 5px;
  transition: all 0.3s ease;
  &:hover {
    background: #ff416c;
    transform: scale(1.1);
  }
`;

const Download = () => {
  const [loading, setLoading] = useState(true);
  const files = [
    {
      name: "Zokou-2.0-main.zip",
      size: "1.82 MB",
      img: "https://i.imgur.com/q92brnd.jpg",
      link: "https://devuploads.com/q92brndqh6t1",
    },
    {
      name: "Another-File.zip",
      size: "2.5 MB",
      img: "https://i.imgur.com/example.jpg",
      link: "https://devuploads.com/examplelink",
    },
  ];

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  return (
    <DownloadContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {loading ? (
        <Loader />
      ) : (
        <>
          <Title
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            📥 Téléchargements
          </Title>
          <FileGrid>
            {files.map((file, index) => (
              <FileCard
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <ImageWrapper>
                  <FileImage src={file.img} alt={file.name} />
                </ImageWrapper>
                <FileInfo>
                  <FileName>{file.name}</FileName>
                  <FileSize>📁 Taille : {file.size}</FileSize>
                  <DownloadLink href={file.link} target="_blank">
                    🔗 Télécharger
                  </DownloadLink>
                </FileInfo>
              </FileCard>
            ))}
          </FileGrid>
        </>
      )}
    </DownloadContainer>
  );
};

export default Download;
