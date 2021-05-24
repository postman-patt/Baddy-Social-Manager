import React, { useContext, useEffect, useState } from 'react'
import { Container, ListGroup, Modal, Button, Row, Col } from 'react-bootstrap'
import { GlobalContext } from '../context/GlobalState'
import { Link } from 'react-router-dom'
import Session from './Session'
import AddSession from './AddSession'
import EditSession from './EditSession'
import SingleSession from './SingleSession'
import LoginScreen from './LoginScreen'
import Paginate from './Paginate'
import AOS from 'aos'
import 'aos/dist/aos.css'
import moment from 'moment'

const SessionList = ({ match }) => {
  const pageNumber = match.params.pageNumber || 1

  const {
    loading,
    sessions,
    getSessions,
    userInfo,
    logout,
    show,
    handleShowSession,
    handleCloseSession,
    showEdit,
    handleCloseEditSession,
    activeItem,
    page,
    pages,
  } = useContext(GlobalContext)

  //Add project modal State
  const [showAdd, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  useEffect(() => {
    AOS.init()
    AOS.refresh()
    if (userInfo) {
      getSessions(userInfo.token, pageNumber)
    }
    return
  }, [userInfo, loading, activeItem, pageNumber])

  if (!userInfo) return <LoginScreen />

  return (
    <>
      <Row>
        <Col className='d-flex justify-content-center logged-in'>
          {' '}
          <p>
            You are logged in as {userInfo.name}{' '}
            <Link to='/profile/page/1' style={{ textDecoration: 'none' }}>
              <i className='fas fa-user'></i>
            </Link>
          </p>
        </Col>
      </Row>

      <Container>
        <ListGroup className='create-session'>
          <ListGroup.Item className='create-session'>
            <Row>
              <Button variant='primary' size='lg' onClick={handleShow}>
                Create a session
              </Button>
            </Row>
          </ListGroup.Item>
        </ListGroup>

        {userInfo &&
          sessions &&
          sessions.map((session) => (
            <div key={session._id}>
              <a
                onClick={() => {
                  handleShowSession(session)
                }}
                style={{ textDecoration: 'none' }}
              >
                <ListGroup className='my-2'>
                  <ListGroup.Item
                    key={session._id}
                    variant='primary'
                    action
                    className='pt-3'
                    data-aos='fade-up'
                    data-aos-duration='1000'
                    data-aos-delay='700'
                  >
                    <Session session={session} />
                  </ListGroup.Item>
                </ListGroup>
              </a>
            </div>
          ))}
        <Modal
          show={show}
          onHide={handleCloseSession}
          keyboard='false'
          size='lg'
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Session Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <SingleSession />
          </Modal.Body>
        </Modal>
        <Modal
          show={showEdit}
          onHide={handleCloseEditSession}
          keyboard='false'
          size='md'
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Session</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <EditSession />
          </Modal.Body>
        </Modal>

        <br></br>
        <Row>
          <Col>
            <Button
              className='center'
              variant='danger'
              size='lg'
              onClick={logout}
            >
              Logout
            </Button>
          </Col>
          <Col className='d-flex justify-content-end'>
            <Paginate pages={pages} page={page} />
          </Col>
        </Row>
      </Container>

      <Modal
        show={showAdd}
        onHide={handleClose}
        keyboard='false'
        size='md'
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Session</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddSession handleClose={handleClose} />
        </Modal.Body>
      </Modal>
    </>
  )
}

export default SessionList
