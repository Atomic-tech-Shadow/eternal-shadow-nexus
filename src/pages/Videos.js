import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import styled from "styled-components";
import axios from "axios";

const VideosContainer = styled(motion.div)`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #121212, #1e1e1e);
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
  background: linear-gradient(90deg, #ff416c, #ff4b2b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 20px;
`;

const VideoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
  width: 90%;
  max-width: 1200px;
`;

const VideoCard = styled(motion.div)`
  background: #1a1a1a;
  padding: 10px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 4px 10px rgba(255, 65, 108, 0.3);
  transition: transform 0.3s ease-in-out;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const VideoThumbnail = styled.img`
  width: 100%;
  border-radius: 8px;
`;

const VideoTitle = styled.h2`
  font-size: 1.2rem;
  margin-top: 10px;
  text-align: center;
`;

const Videos = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    // Récupération des vidéos depuis l'API Videmoly
    axios
      .get("https://api.videmoly.com/videos?limit=6")
      .then((response) => {
        setVideos(response.data.videos);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des vidéos :", error);
      });
  }, []);

  return (
    <VideosContainer
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
        Vidéos Exclusives
      </Title>

      <VideoGrid>
        {videos.length > 0 ? (
          videos.map((video, index) => (
            <VideoCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <a href={video.url} target="_blank" rel="noopener noreferrer">
                <VideoThumbnail src={video.thumbnail} alt={video.title} />
                <VideoTitle>{video.title}</VideoTitle>
              </a>
            </VideoCard>
          ))
        ) : (
          <p>Chargement des vidéos...</p>
        )}
      </VideoGrid>

      <Footer />
    </VideosContainer>
  );
};

export default Videos;
