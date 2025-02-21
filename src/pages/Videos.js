import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
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

const SearchBar = styled.input`
  width: 80%;
  max-width: 500px;
  padding: 12px;
  margin: 20px 0;
  border-radius: 8px;
  border: none;
  background: #333;
  color: #fff;
  font-size: 1rem;
  text-align: center;
  outline: none;
  transition: 0.3s;

  &:focus {
    background: #444;
    box-shadow: 0 0 10px rgba(255, 65, 108, 0.5);
  }

  &::placeholder {
    color: #bbb;
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
  box-shadow: 0px 4px 10px rgba(255, 65, 108, 0.3);
  transition: transform 0.3s ease-in-out;
  cursor: pointer;
  
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

const NoResults = styled.p`
  font-size: 1.2rem;
  text-align: center;
  color: #ff416c;
  margin-top: 20px;
`;

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setVideos([]);
      return;
    }

    setLoading(true);

    const fetchVideos = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/search`,
          {
            params: {
              part: "snippet",
              q: searchQuery,
              key: "AIzaSyBGGtxiSpRJYCYyWeHuG37QDRumCsh32Oo",
              type: "video",
              maxResults: 10,
            },
          }
        );
        setVideos(response.data.items);
      } catch (error) {
        console.error("Erreur lors du chargement des vidéos :", error);
      }
      setLoading(false);
    };

    const timeout = setTimeout(fetchVideos, 500); // Ajoute un délai pour éviter trop de requêtes

    return () => clearTimeout(timeout); // Nettoie le timeout pour éviter les requêtes inutiles
  }, [searchQuery]);

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

      <SearchBar
        type="text"
        placeholder="Rechercher des vidéos..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {loading && <p>Chargement des vidéos...</p>}

      {videos.length === 0 && !loading && searchQuery !== "" && (
        <NoResults>Aucune vidéo trouvée</NoResults>
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
