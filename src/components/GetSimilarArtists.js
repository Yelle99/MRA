import React, { useState, useEffect } from "react";
import Artists from "./Artists";
import { Link } from 'react-router-dom';

const GetSimilarArtists = () => {
  const API_KEY = "a268a7225295d73ca7982e95f5d5a423";

  const [artists, setArtists] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState(" ");
  const [shouldDisplay, setshouldDisplay] = useState(false);

  useEffect(() => {
    getSimilarArtists();
  }, [query]);

  const getSimilarArtists = async () => {
    const response = await fetch(
      `http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=${query}&limit=10&api_key=${API_KEY}&format=json`
    );
    const data = await response.json();
    console.log(data);
    setArtists(data.similarartists.artist);
  };

  const updateSearch = (e) => {
    setSearch(e.target.value);
  }

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
    setshouldDisplay(true);
  }

  const linkStyle = {
    color: 'rgb(198, 129, 219)',
    textDecoration: 'none'
  }

  return (
    <div className = "wrapper1">
      <Link style = {linkStyle} to = "/">&larr; Go Back</Link>
      <div className = "main-div1">
        <h2>Similar Artists</h2>
        <p>Enter artist name:</p>
        <form onSubmit = {getSearch}>
          <input
            type="text"
            placeholder="enter artist name here"
            value={search} 
            onChange={updateSearch}
          />
          <button type="submit">Get!</button>
        </form>
        {shouldDisplay &&
          <div><h3>SIMILAR TO {query}:</h3>
          {artists.map((artist) => (
            <Artists
              key = {artist.mbid}
              name = {artist.name}
            />
          ))}</div>
        }
        </div>
    </div>
  );
};

export default GetSimilarArtists;
