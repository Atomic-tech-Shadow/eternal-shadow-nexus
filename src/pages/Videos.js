import React, { useState, useEffect } from "react";

const API_KEY = "AIzaSyBGGtxiSpRJYCYyWeHuG37QDRumCsh32Oo";

const Videos = () => {
  const [query, setQuery] = useState("");
  const [videos, setVideos] = useState([]);
  const [nextPageToken, setNextPageToken] = useState(null);

  const fetchVideos = async (searchQuery, pageToken = "") => {
    if (!searchQuery) return;

    const url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&q=${searchQuery}&part=snippet&type=video&maxResults=10&pageToken=${pageToken}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.items) {
        setVideos((prevVideos) => (pageToken ? [...prevVideos, ...data.items] : data.items));
        setNextPageToken(data.nextPageToken || null);
      }
    } catch (error) {
      console.error("Erreur de chargement des vidéos :", error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchVideos(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div>
      <h2>Recherche YouTube</h2>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Rechercher une vidéo..."
      />

      <div>
        {videos.length === 0 ? (
          <p>Aucune vidéo trouvée</p>
        ) : (
          videos.map((video) => (
            <div key={video.id.videoId}>
              <a href={`https://www.youtube.com/watch?v=${video.id.videoId}`} target="_blank" rel="noopener noreferrer">
                <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} />
                <p>{video.snippet.title}</p>
              </a>
            </div>
          ))
        )}
      </div>

      {nextPageToken && (
        <button onClick={() => fetchVideos(query, nextPageToken)}>Next</button>
      )}
    </div>
  );
};

export default Videos;
