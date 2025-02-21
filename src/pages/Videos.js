import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import styled from "styled-components";
import axios from "axios";
import { FaDownload } from "react-icons/fa";

const VideosContainer = styled(motion.div)`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #0f0f0f, #1a1a1a);
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 80px;
`;

const Title = styled(motion.h1)`
  font-size: 3rem;
  font-weight: bold;
  text-align: center;
  background: linear-gradient(90deg, #ff416c, #ff4b2b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 20px;
`;

const SearchBarWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 20px;
`;

const SearchBar = styled.input`
  width: 350px;
  padding: 12px;
  border-radius: 25px;
  border: 2px solid #ff4b2b;
  background: #222;
  color: #fff;
  font-size: 1rem;
  text-align: center;
  outline: none;
  transition: all 0.3s ease-in-out;

  &:focus {
    width: 400px;
    border-color: #ff416c;
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
  max-width: 1300px;
`;

const VideoCard = styled(motion.div)`
  background: #1a1a1a;
  padding: 15px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0px 4px 12px rgba(255, 65, 108, 0.3);
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const VideoThumbnail = styled.img`
  width: 100%;
  border-radius: 10px;
  transition: all 0.3s ease-in-out;

  &:hover {
    filter: brightness(1.1);
  }
`;

const VideoTitle = styled.h2`
  font-size: 1.2rem;
  text-align: center;
  margin-top: 10px;
`;

const DownloadButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  background: linear-gradient(90deg, #ff4b2b, #ff416c);
  color: white;
  font-weight: bold;
  text-transform: uppercase;
  text-decoration: none;
  border-radius: 5px;
  transition: all 0.3s ease-in-out;

  &:hover {
    background: linear-gradient(90deg, #ff416c, #ff4b2b);
    transform: scale(1.05);
  }
`;

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (searchQuery) {
      axios
        .get(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchQuery}&key=AIzaSyBGGtxiSpRJYCYyWeHuG37QDRumCsh32Oo`
        )
        .then((response) => {
          setVideos(response.data.items);
        })
        .catch((error) => {
          console.error("Erreur lors du chargement des vidéos :", error);
        });
    }
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

      <SearchBarWrapper>
        <SearchBar
          type="text"
          placeholder="Rechercher des vidéos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </SearchBarWrapper>

      <VideoGrid>
        {videos.length > 0 ? (
          videos.map((video, index) => (
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

              <DownloadButton
                href={`https://www.ssyoutube.com/watch?v=${video.id.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaDownload /> Télécharger
              </DownloadButton>
            </VideoCard>
          ))
        ) : (
          <p>Chargement des vidéos...</p>
        )}
      </VideoGrid>

    </VideosContainer>
  );
};

export default Videos;
