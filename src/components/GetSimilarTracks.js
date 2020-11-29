import React, { useEffect, useState } from 'react';
import Tracks from "./Tracks";
import { Link } from 'react-router-dom';

const GetTopAlbums = () => {
  const API_KEY = "a268a7225295d73ca7982e95f5d5a423";

  const [tracks, setTracks] = useState([]);
  const [search, setSearch] = useState("");
  const [artist, setArtist] = useState("cher");
  const [track, setTrack] = useState("believe");
  const [shouldDisplay, setShouldDisplay] = useState(false);

  useEffect(() => {
    getTracks();
  }, [artist, track]);

  const getTracks = async () => {
    const response = await fetch(
      `http://ws.audioscrobbler.com/2.0/?method=track.getsimilar&limit=10&artist=${artist}&track=${track}&api_key=${API_KEY}&format=json`
    );
    const data = await response.json();
    setTracks(data.similartracks.track);
  };

  const updateSearch = (e) => {
    setSearch(e.target.value);
  }

  const getSearch = (e) => {
    e.preventDefault();
    let strArray = search.split(", ");
    setArtist(strArray[0]);
    setTrack(strArray[1]);
    setSearch('');
  }

  setTimeout(() => {
    artist != "cher" &&
      setShouldDisplay(true);
  }, 600);

  const linkStyle = {
    color: '#f6d365',
    textDecoration: 'none'
  }

  return (
    <div className = "wrapper3">
      <Link style = {linkStyle} to = "/">&larr; Go Back</Link>
      <div className = "main-div3">
        <h2>Similar Songs</h2>
        <p>Enter artist and song name (separated by a coma and whitespace):</p>
        <form onSubmit = {getSearch}>
          <input
            type="text"
            placeholder = "Artist, Song"
            value={search}
            onChange={updateSearch}
          />
          <button onClick = {setTimeout} type="submit">Get!</button>
        </form>
        {shouldDisplay &&
          <div><h3>SIMILAR SONGS TO {track} BY {artist}:</h3>
          {tracks.map((track) => (
            <Tracks 
              key = {track.mbid}
              name = {track.name}
              artist = {track.artist.name}
            />
          ))}
        </div>
        }
      </div>
    </div>
  )
}

export default GetTopAlbums
