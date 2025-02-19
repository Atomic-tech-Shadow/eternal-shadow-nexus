import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import styled from "styled-components";
import axios from "axios";

const GalleryContainer = styled(motion.div)`
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

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px;
  width: 90%;
  max-width: 1200px;
`;

const ImageCard = styled(motion.div)`
  background: #222;
  padding: 10px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 4px 10px rgba(255, 154, 158, 0.3);
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const GalleryImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 8px;
`;

const Gallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Récupération des images depuis l'API
    axios
      .get("https://api.waifu.pics/sfw/waifu")
      .then((response) => {
        setImages([response.data.url, response.data.url, response.data.url, response.data.url, response.data.url]); // Génère plusieurs images pour le test
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des images :", error);
      });
  }, []);

  return (
    <GalleryContainer
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
        Galerie Anime
      </Title>

      <GalleryGrid>
        {images.length > 0 ? (
          images.map((img, index) => (
            <ImageCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <GalleryImage src={img} alt={`Anime ${index}`} />
            </ImageCard>
          ))
        ) : (
          <p>Chargement des images...</p>
        )}
      </GalleryGrid>

    </GalleryContainer>
  );
};

export default Gallery;
