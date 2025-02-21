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

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
`;

const SearchBar = styled.input`
  width: 300px;
  padding: 12px;
  border-radius: 5px;
  border: none;
  background: #333;
  color: #fff;
  font-size: 1rem;
  text-align: center;
  outline: none;

  &::placeholder {
    color: #bbb;
  }
`;

const SearchButton = styled.button`
  padding: 12px 20px;
  background: #ff416c;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: #ff4b2b;
  }
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

const API_KEY = "AIzaSyBGGtxiSpRJYCYyWeHuG37QDRumCsh32Oo";

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (searchQuery.length > 2) {
      fetchVideos(searchQuery);
    }
  }, [searchQuery]);

  const fetchVideos = async (query) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=10&q=${query}&key=${API_KEY}`
      );
      setVideos(response.data.items || []);
    } catch (error) {
      console.error("Erreur lors du chargement des vidéos :", error);
      setVideos([]);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      fetchVideos(searchQuery);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

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

      <SearchWrapper>
        <SearchBar
          type="text"
          placeholder="Rechercher des vidéos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <SearchButton onClick={handleSearch}>Rechercher</SearchButton>
      </SearchWrapper>

      {videos.length === 0 && searchQuery.trim() !== "" && (
        <p style={{ color: "#ff4b2b", fontSize: "1.2rem" }}>Aucune vidéo trouvée</p>
      )}

      <VideoGrid>
        {videos.map((video, index) => (
          <VideoCard
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <a
              href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <VideoThumbnail
                src={video.snippet.thumbnails.high.url}
                alt={video.snippet.title}
              />
              <VideoTitle>{video.snippet.title}</VideoTitle>
            </a>
          </VideoCard>
        ))}
      </VideoGrid>
    </VideosContainer>
  );
};

export default Videos;
