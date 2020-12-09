import React from 'react';
import { Col, Button } from 'react-bootstrap';

import './header.scss';

export default class Header extends React.Component {

  render() {  
    return [
      <Col key='col-brand' md='4'>
        <h1 className='title'>Giflyst</h1>
        <div className='box'>
          <h3>Hi, {this.props.profile.display_name}!</h3>
          <p className='greetings'>Pick a playlist and see what you get <span role='img'>🔥</span></p>  
        </div>
      </Col>,
      <Col key='col-check' md='4' className='pl-selected-box'>
        {
          this.props.plState &&
          <div className='check'>
            <h4><i className="far fa-check-circle"></i> Playlist selected</h4>
            <div>
              <p className='pl-img'><img alt='current-playlist' src={this.props.currentPl.img} /></p>
              <p>{this.props.currentPl.name} <br/> <span>Total {this.props.currentPl.items} tracks</span></p>
            </div>
          </div>
        }
      </Col>,
      <Col key='col-next' md='4'>
        {
          this.props.plState &&
          <div className='next-wrapper'>
            {this.props.stage == '1'  && <Button className='btn-next' onClick={() => this.props.next()}>Next</Button>}
            {this.props.stage == '2' && <Button className='btn btn-secondary btn-back' onClick={() => this.props.back()}>Back</Button>}
          </div>
        }
        
      </Col>
    ]
  }
}