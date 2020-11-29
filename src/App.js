import React from 'react';
import './App.css';
import GetSimilarArtists from './components/GetSimilarArtists';
import GetSimilarTracks from './components/GetSimilarTracks';
import GetTopAlbums from './components/GetTopAlbums';
import Home from './components/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path = "/" exact component = {Home} />
          <Route path = "/getsimilarartists" component = {GetSimilarArtists} />
          <Route path = "/gettopalbums" component = {GetTopAlbums} />
          <Route path = "/getsimilartracks" component = {GetSimilarTracks} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
