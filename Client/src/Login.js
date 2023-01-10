import React from 'react';
import bgimage1 from './HintergrundVid/Mountains.mp4';
import bgimage2 from './HintergrundVid/Jaegerhütte.mp4';
import bgimage3 from './HintergrundVid/Night Sky.mp4';
import bgimage4 from './HintergrundVid/Anime.mp4';
import bgimage5 from './HintergrundVid/blackcat.mp4';
import bgimage6 from './HintergrundVid/spirited.mp4';
import bgimage7 from './HintergrundVid/animeroom.mp4';
import logo from './Images/Logo.jpg';
import "./css/Login.css"

const backgroundVideos = [bgimage1, bgimage2, bgimage3, bgimage4, bgimage5, bgimage6, bgimage7];
const randomIndex = Math.floor(Math.random() * backgroundVideos.length);
const randomVideo = backgroundVideos[randomIndex];

const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=d191edcba8b84b3a939f442b560fe205&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"

export default function Login() {
  return (
    <div className="container1">
      <div className="logo-container1">
        <img src={logo} alt="Logo" height="70" width="70" className="logo1" />
        <h1 className="header1">Spotlounge</h1>
      </div>
      <video autoPlay loop muted className="background-video1">
        <source src={randomVideo} type="video/mp4" />
      </video>
      <a className="btn btn-success btn-lg login-button1" href={AUTH_URL}>
        Login with Spotify
      </a>
    </div>
  );
}
