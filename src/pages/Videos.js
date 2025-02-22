// src/pages/Videos.js
import React, { useState } from 'react';
import axios from 'axios';

const Video = () => {
  const [query, setQuery] = useState('');
  const [videos, setVideos] = useState([]);
  const [nextPageToken, setNextPageToken] = useState('');
  const [loading, setLoading] = useState(false);

  const API_KEY = 'YOUR_YOUTUBE_API_KEY'; // Replace with your YouTube API key

  const searchVideos = async (pageToken = '') => {
    setLoading(true);
    try {
      const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          part: 'snippet',
          maxResults: 10,
          q: query,
          type: 'video',
          pageToken: pageToken,
          key: API_KEY,
        },
      });
      setVideos((prevVideos) => [...prevVideos, ...response.data.items]);
      setNextPageToken(response.data.nextPageToken);
    } catch (error) {
      console.error('Error fetching videos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setVideos([]);
    setNextPageToken('');
    searchVideos();
  };

  const handleNext = () => {
    searchVideos(nextPageToken);
  };

  return (
    <div>
      <h1>YouTube Video Search</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for videos"
        />
        <button type="submit">Search</button>
      </form>

      <div>
        {videos.map((video) => (
          <div key={video.id.videoId} style={{ margin: '10px' }}>
            <iframe
              width="300"
              height="200"
              src={`https://www.youtube.com/embed/${video.id.videoId}`}
              title={video.snippet.title}
              frameBorder="0"
              allowFullScreen
            ></iframe>
            <p>{video.snippet.title}</p>
          </div>
        ))}
      </div>

      {nextPageToken && (
        <button onClick={handleNext} disabled={loading}>
          {loading ? 'Loading...' : 'Next'}
        </button>
      )}
    </div>
  );
};

export default Video;
