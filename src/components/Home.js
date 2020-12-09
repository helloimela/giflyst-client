import React from 'react';
import { Col, Button } from 'react-bootstrap';

import './components.scss';
import './home.scss';

export default class Home extends React.Component {

  render() {
    return [
      <Col key='col-cover' className='cover' md='12'>
        <video preload="auto" autoPlay muted loop id="myVideo">
          <source src="video/video_cover.mp4" type="video/mp4" />
        </video>
        <h1 className='title'>
          Giflyst
          </h1>
        <p>Spice up your day with fun GIF based on your Playlist mood</p>
        <Button href='https://giflyst-backend.herokuapp.com/login' variant="success" className='btn-login'>Login to Spotify</Button>
      </Col>
    ]
  }
}