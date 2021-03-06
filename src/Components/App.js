import React from 'react';
import './App.css';

import SearchBar from './SearchBar/SearchBar'
import SearchResults from './SearchResults/SearchResults'
import Playlist from './Playlist/Playlist'

import Spotify from '../util/Spotify'

class App extends React.Component {
  constructor(props) {
    super(props) 

    this.state = {
      searchResults: [],
      playlistName: 'New Playlist',
      playlistTracks: [],
      audioUrl: '',
      trackName: ''
    }

    this.addTrack = this.addTrack.bind(this)
    this.removeTrack = this.removeTrack.bind(this)
    this.updatePlaylistName = this.updatePlaylistName.bind(this)
    this.savePlaylist = this.savePlaylist.bind(this)
    this.search = this.search.bind(this)
    this.getSampleTrack = this.getSampleTrack.bind(this)
  }

  componentDidMount() {
    Spotify.getAccessToken()
  }

  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter(savedTrack => savedTrack.id !== track.id)

    let newSearchResult = this.state.searchResults;
    newSearchResult.splice(0,0,track)

    this.setState({
      searchResults: newSearchResult,
      playlistTracks: tracks
    })
  }

  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if (tracks.find(savedTrack => savedTrack.id === track.id)) {
      return
    }

    let searchTrack = this.state.searchResults;
    const index = searchTrack.indexOf(track);
    if(index > -1) {
      searchTrack.splice(index, 1)
    }

    tracks.push(track)
    this.setState({
      searchResults: searchTrack,
      playlistTracks: tracks
      
    })
  }

  updatePlaylistName(name) {
    this.setState({
      playlistName: name
    })
  }

  savePlaylist() {
    let uriTracks = this.state.playlistTracks.map(tracks => tracks.uri);
    Spotify.savePlaylist(this.state.playlistName, uriTracks)
  }

  search(term) {
    Spotify.search(term).then(searchResults => {
      this.setState({
        searchResults: searchResults
      })
    })
  }

  getSampleTrack(track) {
    let trackId = track.id
    Spotify.sampleTrack(trackId)
      .then(jsonResponse => {
        let Url = jsonResponse.preview_url;
        this.setState({
          trackName: track.name,
          audioUrl: Url
        })
      })
  }

  render() {
    
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults}
              onAdd={this.addTrack}
              sampleTrack={this.getSampleTrack} />
            <Playlist playlistName={this.state.playlistName} 
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName} 
              onSave={this.savePlaylist}
              sampleTrack={this.getSampleTrack}/>
          </div>
          {this.state.audioUrl ? 
            <div className='videoPlayer'>
              <div>{this.state.trackName}</div> 
              <video src={this.state.audioUrl} controls></video>
            </div> : null
          }
        </div>
      </div>
    )
  }
}

export default App;
