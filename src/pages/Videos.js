import React, { useState, useEffect } from "react";

const API_KEY = "VOTRE_CLE_API";
const MAX_RESULTS = 10;

const Videos = () => {
  const [query, setQuery] = useState("");
  const [videos, setVideos] = useState([]);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    if (query.length > 2) {
      fetchVideos(query);
    }
  }, [query]);

  const fetchVideos = async (searchQuery, pageToken = "") => {
    const url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&part=snippet&type=video&maxResults=${MAX_RESULTS}&q=${searchQuery}&pageToken=${pageToken}`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();
      
      if (pageToken) {
        setVideos((prevVideos) => [...prevVideos, ...data.items]);
      } else {
        setVideos(data.items);
      }

      setNextPageToken(data.nextPageToken);
    } catch (error) {
      console.error("Erreur lors du chargement des vidéos", error);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <input
        type="text"
        placeholder="Rechercher une vidéo..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          padding: "10px",
          width: "80%",
          fontSize: "16px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          outline: "none",
        }}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "15px",
          marginTop: "20px",
        }}
      >
        {videos.map((video) => (
          <div
            key={video.id.videoId}
            onClick={() => setSelectedVideo(video.id.videoId)}
            style={{
              cursor: "pointer",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "10px",
              boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
              transition: "0.3s",
            }}
          >
            <img
              src={video.snippet.thumbnails.high.url}
              alt={video.snippet.title}
              style={{ width: "100%", borderRadius: "10px" }}
            />
            <h4 style={{ marginTop: "10px", fontSize: "14px", fontWeight: "bold" }}>
              {video.snippet.title}
            </h4>
          </div>
        ))}
      </div>

      {nextPageToken && (
        <button
          onClick={() => fetchVideos(query, nextPageToken)}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            fontSize: "16px",
            background: "#007BFF",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "0.3s",
          }}
        >
          Charger plus
        </button>
      )}

      {selectedVideo && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100vw",
            height: "100vh",
            background: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <iframe
            width="800"
            height="450"
            src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ borderRadius: "10px" }}
          ></iframe>
          <button
            onClick={() => setSelectedVideo(null)}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              fontSize: "16px",
              background: "red",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              transition: "0.3s",
            }}
          >
            Fermer
          </button>
        </div>
      )}
    </div>
  );
};

export default Videos;
