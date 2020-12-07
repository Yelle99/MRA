import React, { useState, useEffect, useRef } from "react";
import Artists from "./Artists";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

const GetSimilarArtists = () => {
  const API_KEY = "a268a7225295d73ca7982e95f5d5a423";

  const [artists, setArtists] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [shouldDisplay, setShouldDisplay] = useState(false);
  const [allArtists, setAllArtists] = useState([]);
  const [query2, setQuery2] = useState("");

  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      console.log("fetching");
      getSimilarArtists();
    } else {
      isMounted.current = true;
    }
  }, [query]);

  useEffect(() => {
    if (isMounted.current && search.length > 1) {
      console.log("fetching");
      getAllArtists();
    } else {
      isMounted.current = true;
    }
  }, [query2]);

  const getSimilarArtists = async () => {
    const response = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=${query}&autocorrect=[1]&limit=10&api_key=${API_KEY}&format=json`
    );
    const data = await response.json();
    console.log(data);
    setArtists(data.similarartists.artist);
  };

  const getAllArtists = async () => {
    const response = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${query2}&api_key=${API_KEY}&format=json`
    );
    const data = await response.json();
    setAllArtists(data.results.artistmatches.artist);
  };

  const updateSearch = (e) => {
    setSearch(e.target.value);
    setQuery2(search);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setSearch("");
  };

  const linkStyle = {
    color: "#610054",
    textDecoration: "none",
    padding: '3vh'
  };

  const refreshPage = () => {
    window.location.reload(false);
  };

  setTimeout(() => {
    search === "" && query != 0 &&
      setShouldDisplay(true);
  }, 400);

  return (
    <div className="wrapper1">
      <Link style={linkStyle} to="/">
        &larr; Go Back
      </Link>
      <div className = {`main-div1 ${shouldDisplay ? "active" : ""}`}>
        <div className="ikona1">
          <i class="fas fa-music"></i>
        </div>
        <h2>Similar Artists</h2>
        <p>Enter artist name and press Enter</p>
        <div className="input1">
          <Autocomplete
            id="free-solo-demo"
            onChange={getSearch}
            freeSolo
            options={allArtists.map((option) => option.name)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Artist Name"
                margin="normal"
                variant="outlined"
                {...setQuery(params.inputProps.value)}
                onChange={updateSearch}
              />
            )}
          />
        </div>
      </div>
      {shouldDisplay && (
        <div className = "display1">
          <h3>SIMILAR TO {query}:</h3>
          {artists.map((artist) => (
            <Artists key={artist.mbid} name={artist.name} />
          ))}
          <button className = "gumb1" onClick={refreshPage}>Try Again</button>
        </div>
      )}
    </div>
  );
};

export default GetSimilarArtists;
