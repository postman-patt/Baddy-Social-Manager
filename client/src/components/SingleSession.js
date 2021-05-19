import React, { useContext } from 'react'
import { Button, ListGroup, Modal } from 'react-bootstrap'
import { GlobalContext } from '../context/GlobalState'
import moment from 'moment'

const SingleSession = () => {
  const {
    deleteSession,
    userInfo,
    activeItem,
    addPlayer,
    handleCloseSession,
    handleShowEditSession,
    removePlayer,
  } = useContext(GlobalContext)

  if (activeItem) {
    return (
      <>
        <ListGroup variant='flush' className='session-details'>
          <ListGroup.Item variant='primary'>
            <p>
              <span>Hosted By:</span> {activeItem.host.name}
            </p>
          </ListGroup.Item>
          <ListGroup.Item variant='primary'>
            <p>
              <span>Email:</span> {activeItem.host.email}
            </p>
          </ListGroup.Item>
          <ListGroup.Item variant='primary'>
            <p>
              <span>Date:</span>{' '}
              {moment(activeItem.date).format('dddd MMMM d, YYYY')}
            </p>
          </ListGroup.Item>
          <ListGroup.Item variant='primary'>
            <p>
              <span>Time:</span> {activeItem.time}
            </p>
          </ListGroup.Item>
          <ListGroup.Item variant='primary'>
            <p>
              <span>Costs per player:</span> $
              {activeItem.players.length !== 1
                ? (
                    parseInt(activeItem.totalCosts) /
                    parseInt(activeItem.players.length)
                  ).toFixed(2)
                : parseInt(activeItem.totalCosts)}
            </p>
          </ListGroup.Item>
          <ListGroup.Item variant='primary'>
            <p>
              <span>Venue:</span> {activeItem.location}
            </p>
          </ListGroup.Item>
          <ListGroup.Item variant='primary'>
            <span>List of Players:</span>
            <br></br>
            <br></br>
            {activeItem.players.map((player) => (
              <p>{player.name}</p>
            ))}
          </ListGroup.Item>
          <ListGroup.Item variant='primary'>
            <p>
              <span>Additional Notes:</span> {activeItem.notes}
            </p>
          </ListGroup.Item>
        </ListGroup>

        <Modal.Footer>
          {userInfo._id === activeItem.host._id && (
            <>
              <Button
                variant='danger'
                onClick={() => {
                  deleteSession(activeItem._id, userInfo.token)
                  handleCloseSession()
                }}
              >
                Delete
              </Button>
              <Button
                variant='info'
                onClick={() => {
                  handleShowEditSession()
                  handleCloseSession()
                }}
              >
                Edit
              </Button>
            </>
          )}{' '}
          {activeItem.players.every((item) => item._id !== userInfo._id) ? (
            <Button
              onClick={() => {
                addPlayer(activeItem._id, userInfo._id, userInfo.token)
                handleCloseSession()
              }}
            >
              Join
            </Button>
          ) : (
            <Button
              variant='danger'
              onClick={() => {
                removePlayer(activeItem._id, userInfo._id, userInfo.token)
                handleCloseSession()
              }}
            >
              Remove
            </Button>
          )}
        </Modal.Footer>
      </>
    )
  }
}

export default SingleSession
