import React, { useEffect, useState, useRef } from 'react'
import Albums from "./Albums";
import { Link } from 'react-router-dom';
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
      console.log('fetching');
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
    setSearch('');
    setShouldDisplay(true);
  }

  const linkStyle = {
    color: '#ff508a',
    textDecoration: 'none'
  }

  const refreshPage = () => {
    window.location.reload(false);
  }

  return (
    <div className = "wrapper2">
      <Link style = {linkStyle} to = "/">&larr; Go Back</Link>
      <div className = "main-div2">
        <h2>Top Albums</h2>
        <p>Enter artist name:</p>
        <div style={{ width: 300 }}>
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
                {...console.log(params)}
                {...setQuery(params.inputProps.value)}
                onChange={updateSearch}
              />
            )}
          />
          <button onClick = {refreshPage}>Try Again</button>
        </div>
        {shouldDisplay &&
          <div><h3>TOP 10 ALBUMS BY {query}:</h3>
            {albums.map((album) => (
              <Albums 
                key = {album.mbid}
                name = {album.name}
              />
            ))}
          </div>
        }
      </div>
    </div>
  )
}

export default GetTopAlbums
