import React from 'react';
import { Container } from "react-bootstrap"
import bgimage1 from './HintergrundVid/Mountains.mp4';
import bgimage2 from './HintergrundVid/Jaegerhütte.mp4';
import bgimage3 from './HintergrundVid/Night Sky.mp4';
import bgimage4 from './HintergrundVid/Anime.mp4';
import bgimage5 from './HintergrundVid/blackcat.mp4';
import logo from './Images/Logo.jpg';

const backgroundVideos = [bgimage1, bgimage2, bgimage3, bgimage4, bgimage5];
const randomIndex = Math.floor(Math.random() * backgroundVideos.length);
const randomVideo = backgroundVideos[randomIndex];

const AUTH_URL = 
  "https://accounts.spotify.com/authorize?client_id=d191edcba8b84b3a939f442b560fe205&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"

export default function Login() {
  return (
    <div className="background-container">
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh", position: "relative" }}
      >
        <div style={{ position: "relative" }}>
          <div style={{ position: "fixed", zIndex: "1", top: "0", left: "0", width: "100%" }}>
          <img src={logo} alt="Logo" height="50" width="50" style={{ position: "fixed", zIndex: "1", top: "0", left: "0"}} />
            <h1 style={{ color: "white", textAlign: "center", padding: "10px" }}>Spotlounge</h1>
          </div>
          <video autoPlay loop muted style={{ position: "fixed", zIndex: "-1", top: "0", left: "0", right: "0", overflowX: "auto" }} height="100%" width="100%">
            <source src={randomVideo} type="video/mp4" />
          </video>
            <a
                className="btn btn-success btn-lg login-button"
                href={AUTH_URL}
                style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}
              >
            Login with Spotify
          </a>
        </div>
      </Container>
    </div>
  );
}
