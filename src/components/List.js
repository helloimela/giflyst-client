import React from 'react';
import { Col, Nav } from 'react-bootstrap';

import './components.scss';

export default class List extends React.Component {

  renderAll(items) {
    // console.log(items)
    const elems = [];

    items.map(item => {
      return elems.push(
        <Nav.Link
          key={'menu-' + item.id}
          eventKey={item.id}
          onSelect={() => this.props.selectPlaylist(item.id)}
          className='link-item'>
          {item.name}
        </Nav.Link>
      );
    })
    return [...elems];
  }

  render() {
    return [
      <Col key='col-your-pl' className='bg-secondary pl-all' md='12'>
        <div className='box'>
          <h2>Select playlist</h2>
          <Nav activeKey={this.props.currentPl}>
            {this.renderAll(this.props.items)}
          </Nav>
        </div>
      </Col>
    ]
  }
}