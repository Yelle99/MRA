import React, { useEffect, useState, useRef } from "react";
import Albums from "./Albums";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

const GetTopAlbums = () => {
  const API_KEY1 = "a268a7225295d73ca7982e95f5d5a423";

  const [albums, setAlbums] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [shouldDisplay, setShouldDisplay] = useState(false);
  const [allArtists, setAllArtists] = useState([]);
  const [query2, setQuery2] = useState("");

  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      console.log("fetching");
      getAlbums();
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

  const getAlbums = async () => {
    const response = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${query}&limit=10&api_key=${API_KEY1}&format=json`
    );
    const data = await response.json();
    setAlbums(data.topalbums.album);
  };

  const getAllArtists = async () => {
    const response = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${query2}&api_key=${API_KEY1}&format=json`
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
    padding: "3vh",
  };

  const refreshPage = () => {
    window.location.reload(false);
  };

  setTimeout(() => {
    search === "" && query != 0 && setShouldDisplay(true);
  }, 400);

  return (
    <div className="wrapper2">
      <Link style={linkStyle} to="/">
        &larr; Go Back
      </Link>
      <div className={`main-div2 ${shouldDisplay ? "active" : ""}`}>
        <div className="cd">
          <i class="fas fa-compact-disc"></i>
        </div>
        <h2>Top Albums</h2>
        <p>Enter artist name:</p>
        <div className = "input2">
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
        <div className = "display2">
          <h3>TOP 10 ALBUMS BY {query}:</h3>
          {albums.map((album) => (
            <Albums key={album.mbid} name={album.name} />
          ))}
          <button className = "gumb2" onClick={refreshPage}>Try Again</button>
        </div>
      )}
    </div>
  );
};

export default GetTopAlbums;
