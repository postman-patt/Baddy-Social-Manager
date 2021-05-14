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
    removePlayer,
  } = useContext(GlobalContext)

  if (activeItem) {
    return (
      <>
        <ListGroup>
          <ListGroup.Item>
            <p>Hosted By: {activeItem.host.name}</p>
          </ListGroup.Item>
          <ListGroup.Item>
            <p>email: {activeItem.host.email}</p>
          </ListGroup.Item>
          <ListGroup.Item>
            <p>Date: {moment(activeItem.date).format('dddd MMMM d, YYYY')}</p>
          </ListGroup.Item>
          <ListGroup.Item>
            <p>Time: {activeItem.time}</p>
          </ListGroup.Item>
          <ListGroup.Item>
            <p>
              Costs per player: $
              {activeItem.players.length !== 1
                ? (
                    parseInt(activeItem.totalCosts) /
                    parseInt(activeItem.players.length)
                  ).toFixed(2)
                : parseInt(activeItem.totalCosts)}
            </p>
          </ListGroup.Item>
          <ListGroup.Item>
            <p>Venue: {activeItem.location}</p>
          </ListGroup.Item>
          <ListGroup.Item>
            List of Players:
            <br></br>
            <br></br>
            {activeItem.players.map((player) => (
              <p>{player.name}</p>
            ))}
          </ListGroup.Item>
          <ListGroup.Item>
            <p>Additional Notes: {activeItem.notes}</p>
          </ListGroup.Item>
        </ListGroup>

        <Modal.Footer>
          {userInfo._id === activeItem.host._id && (
            <Button
              variant='danger'
              onClick={() => {
                deleteSession(activeItem._id, userInfo.token)
                handleCloseSession()
              }}
            >
              Delete
            </Button>
          )}{' '}
          {activeItem.players.every((item) => item._id !== userInfo._id) ? (
            <Button
              onClick={() => {
                addPlayer(activeItem._id, userInfo._id, userInfo.token)
                handleCloseSession()
              }}
            >
              JOIN
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
