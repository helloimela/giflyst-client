import React from 'react';
import { Row, Col } from 'react-bootstrap';
import SpotifyWebApi from 'spotify-web-api-js';

import GifWrapper from './GifWrapper';

import './components.scss';

const spotifyApi = new SpotifyWebApi();

export default class VideoOption extends React.Component {
  constructor() {
    super();
    this.state = {
      currentMood: {},
      winnerMood: ''
    }
  }

  avg(list){
    return list.reduce((a,b) => a+b, 0) / list.length;
  }

  componentDidMount(){
    this.renderSuggestedVideo(this.props.currentPl.items);
  }

  calculateMood(data){
    // Moods:   
    // party = party, fireworks, blink lights => dance, energy, loudness
    // relax = fireplace, rain, forest => acousticnes, instrumentalnes
    // upbeat=transport, urban, cafe, people => energy
    // concert => liveness
    let result={
      acousticness: [],
      danceability: [],
      energy: [],
      instrumentalness: [],
      liveness: [],
      valence: []
    };

    let total={}
    
    data.audio_features.forEach((track) => {
      if(track !== null){
        Object.keys(result).forEach(feature => {
          result[feature] = [...result[feature], track[feature]]
        })
      }
      
    });

    Object.keys(result).forEach(feature => {
      total[feature] = this.avg(result[feature]);
    });

    return total;
  }

  getMax(total) {
    let max;
    let maxFeature;
    max = total.acousticness;
    Object.keys(total).forEach(item => {
      if(total[item] >= max) {max = total[item]; maxFeature = item;}
    })

    return maxFeature;
  }
  
  renderSuggestedVideo(tracks){
    let allTracks = [];

    tracks.forEach(item => {
      allTracks.push(item.track.id);
    });

    spotifyApi.getAudioFeaturesForTracks(allTracks)
    .then((res) => {
      const result = this.calculateMood(res);
      const winner = this.getMax(result);
      console.log(1, winner)
      this.setState({
        currentMood: result,
        winnerMood: winner
      })
    })
  }

  renderAllMoods(moods){
    
    return <Row className='pl-analysis'>
      <Col>
        <div className='box box-shadow'>
          <h4><span role='img' aria-label='winner-emoji'>🏆</span> {this.state.winnerMood}</h4>
        </div>
      </Col>
      <Col>
      <div className='box box-shadow'>
        <p>Acousticness</p>
        <span role='img' aria-label='acoustic-emoji'>🎸 </span>: {Math.floor(moods.acousticness * 100)}%
        </div>
      </Col>
      <Col>
      <div className='box box-shadow'>
      <p>Danceability</p>
        <span role='img' aria-label='dance-emoji'>💃</span> : {Math.floor(moods.danceability * 100)}%
        </div>
      </Col>
      <Col>
      <div className='box box-shadow'>
      <p>Energy</p>
        <span role='img' aria-label='energy-emoji'>⚡</span> : {Math.floor(moods.energy * 100)}%
        </div>
      </Col>
      <Col>
      <div className='box box-shadow'>
      <p>Instrumentalnes</p>
        <span role='img' aria-label='instrumental-emoji'>🎹</span> : {Math.floor(moods.instrumentalness * 100)}%
        </div>
      </Col>
      <Col>
      <div className='box box-shadow'>
      <p>Liveness</p>
      <span role='img' aria-label='liveness-emoji'>🎤 </span>: {Math.floor(moods.liveness * 100)}%
      </div>
      </Col>
      <Col>
        <div className='box box-shadow'>
        <p>Valence</p>
          <span role='img' aria-label='valence-emoji'>😊</span> : {Math.floor(moods.valence * 100)}%
        </div>
      </Col>
    </Row>;
  }

  render() {
    return [
      <Col key='col-title' md='12'>
        <div className='box'>
          <h2>Playlist mood analysis</h2>
          {
            this.renderAllMoods(this.state.currentMood)
          }
        </div>
      </Col>,
      <Col key='col-all-videos' md='12'>
        <div className='box box-shadow'>
        <iframe title='playback-preview' src={'https://open.spotify.com/embed/playlist/' + this.props.plId} width="300" height="80" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
        </div>
      </Col>,
      <Col key='col-proposal' md='12'>
        <div className='box'>
          <h2>Your playlist in GIFs</h2>
          <GifWrapper searchKey={this.state.winnerMood}></GifWrapper>
        </div>
      </Col>,
    ]
  }
}