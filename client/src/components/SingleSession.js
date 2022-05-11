import React, { useContext, useEffect } from 'react'
import { Button, ListGroup, Row, Col } from 'react-bootstrap'
import { GlobalContext } from '../context/GlobalState'
import moment from 'moment'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'

const SingleSession = () => {
  const currentDate = new Date()
  const {
    deleteSession,
    userInfo,
    activeItem,
    addPlayer,
    handleCloseSession,
    handleShowEditSession,
    removePlayer,
    markPaid,
    sessions,
  } = useContext(GlobalContext)

  useEffect(() => {}, [activeItem, sessions])

  if (activeItem) {
    return (
      <>
        <ListGroup variant='flush' className='session-details'>
          <ListGroup.Item variant='primary'>
            <Row>
              <Col>
                <span>Hosted by</span>{' '}
              </Col>
              <Col>
                <p>{activeItem.host.name}</p>
              </Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item variant='primary'>
            <Row>
              <Col>
                <span>Email</span>{' '}
              </Col>
              <Col>
                <p>{activeItem.host.email}</p>
              </Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item variant='primary'>
            <Row>
              <Col>
                <span>Date</span>
              </Col>
              <Col>
                <p>{moment(activeItem.date).format('dddd DD MMMM, YYYY')}</p>
              </Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item variant='primary'>
            <Row>
              <Col>
                <span>Time</span>
              </Col>
              <Col>
                {' '}
                <p>{activeItem.time}</p>
              </Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item variant='primary'>
            <Row>
              <Col>
                <span>Costs per player</span>
              </Col>
              <Col>
                <p>
                  $
                  {activeItem.players.length > 2
                    ? (
                        parseInt(activeItem.totalCosts) /
                        parseInt(activeItem.players.length)
                      ).toFixed(2)
                    : parseInt(activeItem.totalCosts)}
                </p>
              </Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item variant='primary'>
            <Row>
              <Col>
                <span>Venue</span>
              </Col>
              <Col>
                {' '}
                <p>{activeItem.location}</p>{' '}
              </Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item variant='primary pb-5'>
            <Row>
              <span>Additional notes</span>
            </Row>
            <Row>
              <p>{activeItem.notes}</p>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item variant='primary' className='pb-4'>
            <Row className='mt-3'>
              <Col className='d-flex justify-content-center mb-3 player-title'>
                <h2>Players</h2>
              </Col>
            </Row>

            {activeItem.players.map((player) => (
              <Row className='py-1'>
                <Col className='d-flex justify-content-center'>
                  <p>{player.player.name}</p>
                </Col>
                <Col className='d-flex justify-content-center'>
                  {player.paid ? (
                    <i className='far fa-check-square'></i>
                  ) : (
                    <i className='far fa-square'></i>
                  )}
                </Col>
              </Row>
            ))}
            <Row className='mt-5 paid-unpaid'>
              <Col></Col>
              <Col></Col>
              <Col className='d-flex justify-content-center align-items-center'>
                <i className='far fa-check-square px-3'></i>
                <p>Paid</p>
              </Col>
              <Col className='d-flex justify-content-center align-items-center'>
                <i className='far fa-square px-3'></i>
                <p>Unpaid</p>
              </Col>
            </Row>
          </ListGroup.Item>

          <ListGroup.Item variant='primary'>
            <Row>
              <Col className='d-flex justify-content-center py-3 options-title'>
                <h2>Options</h2>
              </Col>
            </Row>{' '}
            {activeItem.players.every(
              (item) => item.player._id !== userInfo._id
            ) ? (
              ''
            ) : (
              <Row className='d-flex justify-content-center my-2'>
                <BootstrapSwitchButton
                  checked={
                    activeItem.players.filter(
                      (item) => item.player._id === userInfo._id
                    )[0].paid
                  }
                  onstyle='success'
                  offstyle='light'
                  size='lg'
                  onlabel='Paid'
                  offlabel='Mark as paid'
                  onChange={() => {
                    markPaid(
                      activeItem._id,
                      activeItem.players.filter(
                        (player) => player.player._id === userInfo._id
                      )[0]._id,
                      userInfo.token
                    )
                  }}
                />
              </Row>
            )}
            {activeItem.players.every(
              (item) => item.player._id !== userInfo._id
            ) ? (
              <Row className='d-flex justify-content-center my-3'>
                <Button
                  block
                  variant='primary'
                  size='lg'
                  onClick={() => {
                    addPlayer(activeItem._id, userInfo._id, userInfo.token)
                  }}
                >
                  Join
                </Button>
              </Row>
            ) : (
              <Row className='d-flex justify-content-center my-3'>
                <Button
                  block
                  size='lg'
                  disabled={
                    new Date(activeItem.date).getTime() < currentDate.getTime()
                      ? 'true'
                      : ''
                  }
                  variant='danger'
                  onClick={() => {
                    removePlayer(
                      activeItem._id,
                      activeItem.players.filter(
                        (player) => player.player._id === userInfo._id
                      )[0]._id,
                      userInfo.token
                    )
                  }}
                >
                  Remove your name
                </Button>
              </Row>
            )}{' '}
            {userInfo._id === activeItem.host._id && (
              <>
                {' '}
                <Row>
                  <Col className='d-flex justify-content-center my-3 options-title'>
                    <h2>Admin</h2>
                  </Col>
                </Row>
                <Row className='d-flex justify-content-center my-2'>
                  <Button
                    variant='outline-info'
                    size='lg'
                    block
                    onClick={() => {
                      handleShowEditSession()
                      handleCloseSession()
                    }}
                  >
                    Edit session
                  </Button>
                </Row>
                <Row className='d-flex justify-content-center my-3'>
                  <Button
                    size='lg'
                    variant='outline-danger'
                    block
                    onClick={() => {
                      deleteSession(activeItem._id, userInfo.token)
                      handleCloseSession()
                    }}
                  >
                    Delete
                  </Button>
                </Row>
              </>
            )}
          </ListGroup.Item>
        </ListGroup>
      </>
    )
  }
}

export default SingleSession
