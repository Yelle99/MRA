import React, { useEffect, useState } from 'react'
import Albums from "./Albums";
import { Link } from 'react-router-dom';

const GetTopAlbums = () => {
  const API_KEY1 = "a268a7225295d73ca7982e95f5d5a423";

  const [albums, setAlbums] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState(" ");
  const [shouldDisplay, setShouldDisplay] = useState(false);

  useEffect(() => {
    getAlbums();
  }, [query]);

  const getAlbums = async () => {
    const response = await fetch(
      `http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${query}&limit=10&api_key=${API_KEY1}&format=json`
    );
    const data = await response.json();
    setAlbums(data.topalbums.album);
  };

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  setTimeout(() => {
    query != 0 &&
      setShouldDisplay(true);
  }, 300);

  const linkStyle = {
    color: '#ff508a',
    textDecoration: 'none'
  }

  return (
    <div className = "wrapper2">
      <Link style = {linkStyle} to = "/">&larr; Go Back</Link>
      <div className = "main-div2">
        <h2>Top Albums</h2>
        <p>Enter artist name:</p>
        <form onSubmit = {getSearch}>
          <input
            type="text"
            placeholder = "enter artist name here"
            value={search}
            onChange={updateSearch}
          />
          <button onClick = {setTimeout} type="submit">Get!</button>
        </form>
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
