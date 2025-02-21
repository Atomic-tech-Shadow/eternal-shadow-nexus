import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import styled from "styled-components";
import axios from "axios";

const API_KEY = "AIzaSyBGGtxiSpRJYCYyWeHuG37QDRumCsh32Oo";
const BASE_URL = "https://www.googleapis.com/youtube/v3/search";

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

const SearchBar = styled.input`
  width: 350px;
  padding: 12px;
  margin: 20px;
  border-radius: 8px;
  border: 2px solid #ff4b2b;
  background: #222;
  color: #fff;
  font-size: 1.1rem;
  text-align: center;
  transition: 0.3s;

  &:focus {
    outline: none;
    background: #333;
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
  padding: 15px;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(255, 65, 108, 0.3);
  transition: transform 0.3s ease-in-out;
  text-align: center;

  &:hover {
    transform: scale(1.05);
  }
`;

const VideoThumbnail = styled.img`
  width: 100%;
  border-radius: 10px;
`;

const VideoTitle = styled.h2`
  font-size: 1.2rem;
  margin: 10px 0;
`;

const WatchButton = styled.a`
  display: inline-block;
  padding: 10px 15px;
  margin-top: 10px;
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
  background: linear-gradient(90deg, #ff416c, #ff4b2b);
  border-radius: 6px;
  text-decoration: none;
  transition: 0.3s;

  &:hover {
    transform: scale(1.1);
    background: linear-gradient(90deg, #ff4b2b, #ff416c);
  }
`;

const Message = styled.p`
  font-size: 1.3rem;
  color: #aaa;
  text-align: center;
  margin-top: 20px;
`;

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchVideos = async (query) => {
    if (!query) return;

    setLoading(true);
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          part: "snippet",
          q: query,
          key: API_KEY,
          maxResults: 10,
          type: "video",
        },
      });

      setVideos(response.data.items || []);
    } catch (error) {
      console.error("Erreur lors du chargement des vidéos :", error);
      setVideos([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      fetchVideos(searchQuery);
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

      <SearchBar
        type="text"
        placeholder="Rechercher des vidéos..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleSearch}
      />

      {loading && <Message>Chargement des vidéos...</Message>}

      <VideoGrid>
        {videos.length > 0 ? (
          videos.map((video, index) => (
            <VideoCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <VideoThumbnail
                src={video.snippet.thumbnails.high.url}
                alt={video.snippet.title}
              />
              <VideoTitle>{video.snippet.title}</VideoTitle>
              <WatchButton
                href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Regarder
              </WatchButton>
            </VideoCard>
          ))
        ) : !loading ? (
          <Message>Aucune vidéo trouvée</Message>
        ) : null}
      </VideoGrid>

    </VideosContainer>
  );
};

export default Videos;
