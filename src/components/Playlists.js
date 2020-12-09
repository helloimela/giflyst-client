import React from 'react';
import { Row, Col } from 'react-bootstrap';

import './components.scss';

export default class Playlists extends React.Component {

  renderTracks(items){
    const elems = []; 
    items.map( item => {
      // console.log(item)
      if(item.track !== null) {
        const imageUrl = item.track.album.images.length > 0 ? item.track.album.images[0].url : 'https://picsum.photos/60';
        return elems.push(
          // <Nav.Link eventKey={item.track.id} onSelect={this.getTrackInfo}>{item.track.artists[0].name} - {item.track.name}</Nav.Link>
          <Col key={'col-track-' + item.track.id} md='4' className='track-artist-wrapper'>
            <div className='track-image' style={{backgroundImage: `url(${imageUrl})`}}></div>
            <div className='track-artist'><span className='artist-name'>{item.track.artists[0].name}</span> <br/> {item.track.name}</div>
          </Col>
        );

      }
      
    })
    return [...elems];
  }

  render() {
    return [
      <Col key='col-preview-pl' md='12' className='bg-blue pl-preview'>
        <div className='box'>
          <Row>
            <Col md='4' className='headline'><h2>Playlist Preview</h2></Col>
            <Col md='8' className='headline'>
              <div className='player'>
                {
                  this.props.tracks && this.props.tracks.items.length > 0 &&
                  <iframe title='playback-preview' src={'https://open.spotify.com/embed/playlist/' + this.props.plId} width="300" height="80" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
              }
              
            </div>
          </Col>
          { this.props.tracks && this.props.tracks.items.length > 0 && this.renderTracks(this.props.tracks.items)}
          { !this.props.tracks && <p className='box'>No playlist selected</p>}
        </Row>
        </div>
      </Col>
    ]
  }
}