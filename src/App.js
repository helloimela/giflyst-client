import React from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import { Container, Row } from 'react-bootstrap';

import './App.scss';
import Header from './components/Header';
import Home from './components/Home';
import Playlists from './components/Playlists';
import List from './components/List';
import VideoOption from './components/VideoOption';

const spotifyApi = new SpotifyWebApi();

export default class App extends React.Component {
  constructor() {
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
      stage: '1',
      playlist: [],
      plSelected: false,
      currentPlaylist: {},
      userProfile: {}
    }
  }

  componentDidMount() {
    if(this.state.loggedIn) {
      spotifyApi.getUserPlaylists()
      .then((response) => {
        this.setState({
          playlist: [...response.items]
        });
      })
    spotifyApi.getMe()
      .then((res) => {
        this.setState({
          userProfile: res
        });
      })
    }
  }

  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
       e = r.exec(q);
    }
    return hashParams;
  }

  selectPlaylist(id) {
    spotifyApi.getPlaylist(id)
    .then((res) => {
      this.setState({
        currentPlaylist : {
          id: res.id,
          name: res.name,
          items: res.tracks.items.length,
          img: res.images[0].url,
          tracks: res.tracks
        }
      }) 
    })
    this.setState({
      plSelected:true
    })
  }

  nextStep(){
    
    this.setState({
      stage: '2'
    })
  }

  back(){
    this.setState({
      stage: '1'
    })
  }

  render() {
    return (
      <Container fluid>
        { !this.state.loggedIn &&
        <Home/>
        }
        <Row>
          { this.state.loggedIn &&
            <Header 
            profile={this.state.userProfile} 
            plState={this.state.plSelected} 
            currentPl={this.state.currentPlaylist}
            stage={this.state.stage}
            next={() => this.nextStep()}
            back={()=>this.back()}
            ></Header>
          }
          { this.state.loggedIn && this.state.playlist.length > 0 && this.state.stage === '1' &&
          <List items = {this.state.playlist} selectPlaylist={(id) => this.selectPlaylist(id)}/>
          }
          { this.state.loggedIn && this.state.playlist.length > 0 && this.state.stage === '1' &&
          <Playlists tracks = {this.state.currentPlaylist.tracks} plId= {this.state.currentPlaylist.id}/>
          }
          {
            this.state.stage === '2' &&
            <VideoOption currentPl = {this.state.currentPlaylist.tracks} plId= {this.state.currentPlaylist.id}/>
          }
        </Row>
      </Container>
    )
  }
};
