import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function FreeSolo() {

  const API_KEY = "a268a7225295d73ca7982e95f5d5a423";
  const [allArtists, setAllArtists] = useState([]);

  useEffect(() => {
    getAllArtists();
  }, []);

  const getAllArtists = async () => {
    const response = await fetch(
      `http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=cher&api_key=${API_KEY}&format=json`
    );
    const data = await response.json();
    setAllArtists(data.results.artistmatches.artist);
  };

  return (
    <div style={{ width: 300 }}>
      <Autocomplete
        id="free-solo-demo"
        freeSolo
        options={allArtists.map((option) => option.name)}
        renderInput={(params) => (
          <TextField {...params} label="Artist Name" margin="normal" variant="outlined" />
        )}
      />
    </div>
  );
}