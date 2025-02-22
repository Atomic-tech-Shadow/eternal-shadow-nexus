import React, { useState, useEffect } from "react";
import "./Videos.css"; // Fichier CSS pour le style

const API_KEY = "TA_CLE_YOUTUBE";
const BASE_URL = "https://www.googleapis.com/youtube/v3/search";

const Videos = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [videos, setVideos] = useState([]);
  const [pageToken, setPageToken] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchTerm.length > 2) {
      fetchVideos(true); // Charge les vidéos à chaque modification de la recherche
    }
  }, [searchTerm]);

  const fetchVideos = async (reset = false) => {
    if (!searchTerm) return;
    setLoading(true);

    const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(
      searchTerm
    )}&part=snippet&maxResults=10&type=video&pageToken=${reset ? "" : pageToken}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      setVideos(reset ? data.items : [...videos, ...data.items]);
      setPageToken(data.nextPageToken || "");
    } catch (error) {
      console.error("Erreur de chargement des vidéos :", error);
    }
    setLoading(false);
  };

  return (
    <div className="videos-container">
      <input
        type="text"
        placeholder="Rechercher des vidéos..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      <div className="videos-grid">
        {videos.map((video, index) => (
          <div key={index} className="video-card">
            <img
              src={video.snippet.thumbnails.high.url}
              alt={video.snippet.title}
              className="video-thumbnail"
            />
            <h3 className="video-title">{video.snippet.title}</h3>
            <p className="video-channel">{video.snippet.channelTitle}</p>
          </div>
        ))}
      </div>

      {pageToken && (
        <button onClick={() => fetchVideos(false)} className="load-more-btn">
          Next
        </button>
      )}

      {loading && <p className="loading-text">Chargement...</p>}
    </div>
  );
};

export default Videos;
