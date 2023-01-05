import React from 'react';
import { Container } from "react-bootstrap"
import bgimage1 from './HintergrundVid/Mountains.mp4';
import bgimage2 from './HintergrundVid/Jaegerhütte.mp4';

const backgroundVideos = [bgimage1, bgimage2];
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
        <video autoPlay loop muted>
          <source src={randomVideo} type="video/mp4" />
        </video>
        <a
          className="btn btn-success btn-lg login-button"
          href={AUTH_URL}
          style={{ position: "absolute" }}
        >
          Login with Spotify
        </a>
      </Container>
    </div>
  );
}
