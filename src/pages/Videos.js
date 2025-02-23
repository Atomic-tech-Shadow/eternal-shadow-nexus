import React, { useState, useEffect } from "react";

const API_KEY = "VOTRE_CLE_API"; const MAX_RESULTS = 10;

const Videos = () => { const [query, setQuery] = useState(""); const [videos, setVideos] = useState([]); const [nextPageToken, setNextPageToken] = useState(null); const [selectedVideo, setSelectedVideo] = useState(null);

useEffect(() => { if (query.length > 2) { fetchVideos(query); } }, [query]);

const fetchVideos = async (searchQuery, pageToken = "") => { const url = https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&part=snippet&type=video&maxResults=${MAX_RESULTS}&q=${searchQuery}&pageToken=${pageToken}; try { const response = await fetch(url); const data = await response.json(); if (pageToken) { setVideos((prevVideos) => [...prevVideos, ...data.items]); } else { setVideos(data.items); } setNextPageToken(data.nextPageToken); } catch (error) { console.error("Erreur lors du chargement des vidéos", error); } };

return ( <div className="video-container" style={{ textAlign: "center", padding: "20px" }}> <input type="text" placeholder="Rechercher une vidéo..." value={query} onChange={(e) => setQuery(e.target.value)} style={{ padding: "10px", width: "80%", fontSize: "16px" }} /> <div className="video-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "10px", marginTop: "20px" }}> {videos.map((video) => ( <div key={video.id.videoId} className="video-card" onClick={() => setSelectedVideo(video.id.videoId)} style={{ cursor: "pointer", padding: "10px", border: "1px solid #ccc", borderRadius: "10px" }} > <img src={video.snippet.thumbnails.high.url} alt={video.snippet.title} style={{ width: "100%", borderRadius: "10px" }} /> <h4>{video.snippet.title}</h4> </div> ))} </div> {nextPageToken && ( <button onClick={() => fetchVideos(query, nextPageToken)} style={{ marginTop: "20px", padding: "10px 20px", fontSize: "16px" }}>Next</button> )} {selectedVideo && ( <div className="video-player" style={{ position: "fixed", top: "10%", left: "50%", transform: "translateX(-50%)", background: "black", padding: "20px", borderRadius: "10px" }}> <iframe width="560" height="315" src={https://www.youtube.com/embed/${selectedVideo}?autoplay=1} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen ></iframe> <button onClick={() => setSelectedVideo(null)} style={{ marginTop: "10px", padding: "5px 10px" }}>Fermer</button> </div> )} </div> ); };

export default Videos;
