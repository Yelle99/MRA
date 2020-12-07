import React, { useEffect, useState, useRef } from "react";
import Tracks from "./Tracks";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

const GetTopAlbums = () => {
  const API_KEY = "a268a7225295d73ca7982e95f5d5a423";

  const [tracks, setTracks] = useState([]);
  const [search, setSearch] = useState("");
  const [search1, setSearch1] = useState("");
  const [artist, setArtist] = useState("");
  const [track, setTrack] = useState("");
  const [shouldDisplay, setShouldDisplay] = useState(false);
  const [allArtists, setAllArtists] = useState([]);
  const [allTracks, setAllTracks] = useState([]);
  const [query2, setQuery2] = useState("");
  const [query3, setQuery3] = useState("");

  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current && shouldDisplay) {
      console.log("fetching");
      getTracks();
    } else {
      isMounted.current = true;
    }
  }, [artist, track]);

  useEffect(() => {
    if (isMounted.current && search.length > 1) {
      console.log("fetching");
      getAllArtists();
    } else {
      isMounted.current = true;
    }
  }, [query2]);

  useEffect(() => {
    if (isMounted.current && search1.length > 1) {
      console.log("fetching");
      getAllTracks();
    } else {
      isMounted.current = true;
    }
  }, [query3]);

  const getTracks = async () => {
    const response = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=track.getsimilar&limit=10&artist=${artist}&track=${track}&api_key=${API_KEY}&format=json`
    );
    const data = await response.json();
    setTracks(data.similartracks.track);
  };

  const getAllArtists = async () => {
    const response = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${query2}&api_key=${API_KEY}&format=json`
    );
    const data = await response.json();
    setAllArtists(data.results.artistmatches.artist);
  };

  const getAllTracks = async () => {
    const response = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=track.search&track=${query3}&api_key=${API_KEY}&format=json`
    );
    const data = await response.json();
    setAllTracks(data.results.trackmatches.track);
  };

  const updateSearch = (e) => {
    setSearch(e.target.value);
    setQuery2(search);
  };

  const updateSearch1 = (e) => {
    setSearch1(e.target.value);
    setQuery3(search1);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setShouldDisplay(true)
    setSearch("");
    setSearch1("");
  };

  const linkStyle = {
    color: "#610054",
    textDecoration: "none",
    padding: "3vh",
  };

  const refreshPage = () => {
    window.location.reload(false);
  };


  return (
    <div className="wrapper3">
      <Link style={linkStyle} to="/">
        &larr; Go Back
      </Link>
      <div className={`main-div3 ${shouldDisplay ? "active" : ""}`}>
        <div className="slusalice">
          <i class="fas fa-headphones-alt"></i>
        </div>
        <h2>Similar Songs</h2>
        <p>Enter artist and song name</p>
        <div className = "input3">
          <Autocomplete
            id="free-solo-demo"
            freeSolo
            options={allArtists.map((option) => option.name)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Artist Name"
                margin="normal"
                variant="outlined"
                {...console.log(params)}
                {...setArtist(params.inputProps.value)}
                onChange={updateSearch}
              />
            )}
          />
          <Autocomplete
            id="free-solo-demo"
            onChange={getSearch}
            freeSolo
            options={allTracks.map((option) => option.name)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Song Name"
                margin="normal"
                variant="outlined"
                {...console.log(params)}
                {...setTrack(params.inputProps.value)}
                onChange={updateSearch1}
              />
            )}
          />
        </div>
      </div>
      {shouldDisplay && (
        <div className = "display3">
          <h3>
            SIMILAR SONGS TO {track} BY {artist}:
          </h3>
          {tracks.map((track) => (
            <Tracks
              key={track.mbid}
              name={track.name}
              artist={track.artist.name}
            />
          ))}
          <button className = "gumb3" onClick={refreshPage}>Try Again</button>
        </div>
      )}
    </div>
  );
};

export default GetTopAlbums;
