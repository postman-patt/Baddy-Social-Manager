import React from 'react'
import { Row, Col } from 'react-bootstrap'
import moment from 'moment'

const Session = ({ session }) => {
  return (
    <Row>
      <Col xs={2}>Hosted By: {session.host.name}</Col>
      <Col xs={3}>{session.location}</Col>
      <Col xs={3}>{moment(session.date).format('dddd MMMM d, YYYY')}</Col>
      <Col xs={2}>{session.time}</Col>
      <Col xs={2}>
        <i className='fas fa-user'></i> {session.players.length}
      </Col>
    </Row>
  )
}

export default Session
