import React, { useEffect, useState } from "react";
import axios from "axios";
import queryString from "query-string";

const CLIENT_ID = "your_spotify_client_id"; // Replace with your actual Spotify Client ID
const CLIENT_SECRET = "your_spotify_client_secret"; // Replace with your actual Spotify Client Secret
const REDIRECT_URI = "http://localhost:3000/music"; // Update this if deployed
const AUTH_URL = "https://accounts.spotify.com/authorize";
const TOKEN_URL = "https://accounts.spotify.com/api/token";
const API_URL = "https://api.spotify.com/v1";

const Music = () => {
  const [token, setToken] = useState("");
  const [tracks, setTracks] = useState([]);

  // Function to get Access Token
  const getAccessToken = async () => {
    const hash = queryString.parse(window.location.hash);
    if (hash.access_token) {
      setToken(hash.access_token);
      window.history.pushState({}, null, "/music"); // Remove access token from URL
    } else {
      const response = await axios.post(
        TOKEN_URL,
        new URLSearchParams({
          grant_type: "client_credentials",
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
        }),
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );
      setToken(response.data.access_token);
    }
  };

  // Function to fetch music data
  const fetchMusic = async () => {
    if (!token) return;
    try {
      const response = await axios.get(`${API_URL}/browse/new-releases`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTracks(response.data.albums.items);
    } catch (error) {
      console.error("Error fetching music:", error);
    }
  };

  useEffect(() => {
    getAccessToken();
  }, []);

  useEffect(() => {
    if (token) fetchMusic();
  }, [token]);

  return (
    <div className="container">
      <h2 className="text-center mt-4">Latest Music Releases</h2>
      {token ? (
        <div className="row">
          {tracks.map((track) => (
            <div key={track.id} className="col-md-4">
              <div className="card mb-3">
                <img src={track.images[0]?.url} alt={track.name} className="card-img-top" />
                <div className="card-body">
                  <h5 className="card-title">{track.name}</h5>
                  <p className="card-text">By {track.artists.map((a) => a.name).join(", ")}</p>
                  <a href={track.external_urls.spotify} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                    Listen on Spotify
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center mt-4">
          <a href={`${AUTH_URL}?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${REDIRECT_URI}&scope=user-read-private user-read-email`} 
             className="btn btn-success">
            Login to Spotify
          </a>
        </div>
      )}
    </div>
  );
};

export default Music;
