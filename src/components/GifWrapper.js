import React from 'react';
import { Col } from 'react-bootstrap';
import { Grid } from '@giphy/react-components';
import { GiphyFetch } from '@giphy/js-fetch-api';

import './components.scss';

const gf = new GiphyFetch('iTQ5227APCRLGePYsWhZOVIvZjG28Z2M');


export default class GifWrapper extends React.Component {
  constructor() {
    super();

    this.state = {
      width: window.innerWidth
    }
  }

  fetchGifs = (offset) => {
    const finalKey = this.switchSearch(this.props.searchKey);
    
    return gf.search(finalKey, { offset, limit: 10 })
  }

  switchSearch(key){
    let finalKey = '';
    switch(key){
      case 'danceability': return finalKey = 'dancing';
      case 'acousticness': return finalKey = 'cozy';
      case 'energy': return finalKey = 'workout';
      case 'instrumentalness': return finalKey = 'piano';
      case 'liveness': return finalKey = 'concert';
      case 'valence': return finalKey = 'yeay';
      default: finalKey='music'
    }
    return finalKey;
  }

  render() {
    return [
      <Col key='col-gif' d='12'>
        <Grid width={this.state.width} columns={4} fetchGifs={this.fetchGifs} />
      </Col>
    ]
  }
}