import { useState, useEffect } from "react"
import useAuth from "./useAuth"
import Player from "./Player"
import TrackSearchResult from "./TrackSearchResult"
import { Form } from "react-bootstrap"
import SpotifyWebApi from "spotify-web-api-node"
import axios from "axios"
import bgimage1 from './HintergrundVid/Mountains.mp4';
import bgimage2 from './HintergrundVid/Jaegerhütte.mp4';
import bgimage3 from './HintergrundVid/Night Sky.mp4';
import bgimage4 from './HintergrundVid/Anime.mp4';
import bgimage5 from './HintergrundVid/blackcat.mp4';
import bgimage6 from './HintergrundVid/spirited.mp4';
import bgimage7 from './HintergrundVid/animeroom.mp4';
import logo from './Images/Logo.jpg';
import Clock from "./Clock"

const backgroundVideos = [bgimage1, bgimage2, bgimage3, bgimage4, bgimage5, bgimage6, bgimage7];
const randomIndex = Math.floor(Math.random() * backgroundVideos.length);
const randomVideo = backgroundVideos[randomIndex];

const spotifyApi = new SpotifyWebApi({
  clientId: "d191edcba8b84b3a939f442b560fe205",
})

export default function Dashboard({ code }) {
  const accessToken = useAuth(code)
  const [search, setSearch] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [playingTrack, setPlayingTrack] = useState()
  const [lyrics, setLyrics] = useState("")
  const [time, setTime] = useState(new Date().toLocaleTimeString())

  function chooseTrack(track) {
    setPlayingTrack(track)
    setSearch("")
    setLyrics("")
  }

   useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (!playingTrack) return

    axios
      .get("http://localhost:3001/lyrics", {
        params: {
          track: playingTrack.title,
          artist: playingTrack.artist,
        },
      })
      .then(res => {
        setLyrics(res.data.lyrics)
      })
  }, [playingTrack])

  useEffect(() => {
    if (!accessToken) return
    spotifyApi.setAccessToken(accessToken)
  }, [accessToken])

  useEffect(() => {
    if (!search) return setSearchResults([])
    if (!accessToken) return

    let cancel = false
    spotifyApi.searchTracks(search).then(res => {
      if (cancel) return
      setSearchResults(
        res.body.tracks.items.map(track => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image
              return smallest
            },
            track.album.images[0]
          )

          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
          }
        })
      )
    })

    return () => (cancel = true)
  }, [search, accessToken])


  return (

    <div class="container text-center">
    <div class="row">
    <div class="col">
    <div className="d-flex flex-column py-2" style={{ height: "100vh", width: "100%",  position: "flexible"}}>
      <Form.Control
        type="search"
        placeholder="Search Songs/Artists"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <div className="d-flex flex-column py-2" style={{color:"white"}}>
          <Clock>
            {time}
          </Clock>
        </div>
      
      <div className="flex-grow-1 my-2" style={{ overflowY: "auto", color:"white", width: "100%"  }}>
        {searchResults.map(track => (
          <TrackSearchResult
            track={track}
            key={track.uri}
            chooseTrack={chooseTrack}
          />
          

        ))}

        <img src={logo} alt="Logo" height="70" width="70" className="logo1" />
        <video autoPlay loop muted style={{ position: "fixed", zIndex: "-1", top: "0", left: "0", right: "0", width:"100%", height: "100%", objectFit: "cover" }}>
          <source src={randomVideo} type="video/mp4" />
        </video>

        {searchResults.length === 0 && (
      <div className="text-left" style={{ whiteSpace: "pre", color: "white",background: "rgba(0, 0, 0,0.7)" }}>
        {lyrics}
      </div>
     )}
</div>
      <div>
        <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
      </div> 
      
    </div>
    </div>
    
    <div class="col">
      <div class="form-floating py-2">
        <textarea class="form-control" placeholder="To-do" id="floatingTextarea" style={{height: "230px", width: "700px",color:"white", background: "rgba(0, 0, 0,0.7)"}}></textarea>
        <label for="floatingTextarea" style={{color: "white"}}>To-do</label>
      </div>

      <div class="form-floating py-2">
        <textarea class="form-control" placeholder="To-do" id="floatingTextarea" style={{height: "230px", width: "700px", color:"white", background: "rgba(0, 0, 0,0.7)"}}></textarea>
        <label for="floatingTextarea" style={{color: "white"}}>Doing</label>
      </div>

      <div class="form-floating py-2">
        <textarea class="form-control" placeholder="To-do" id="floatingTextarea" style={{height: "230px", width: "700px",color:"white", background: "rgba(0, 0, 0,0.7)"}}></textarea>
        <label for="floatingTextarea" style={{color: "white"}}>Done</label>
      </div>

    </div>
    </div>
    </div>
    
  )
}
