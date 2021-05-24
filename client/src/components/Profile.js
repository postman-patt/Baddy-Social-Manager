import React, { useState, useContext, useEffect } from 'react'
import {
  Row,
  Col,
  Form,
  Button,
  Alert,
  ListGroup,
  Modal,
} from 'react-bootstrap'
import { GlobalContext } from '../context/GlobalState'
import Session from './Session'
import SingleSession from './SingleSession'
import EditSession from './EditSession'
import Paginate from './Paginate'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'

const Profile = ({ match }) => {
  const pageNumber = match.params.pageNumber || 1
  const {
    userInfo,
    sessions,
    updateUser,
    getUserSessions,
    loading,
    activeItem,
    show,
    handleShowSession,
    handleCloseSession,
    showEdit,
    handleCloseEditSession,
    page,
    pages,
  } = useContext(GlobalContext)

  const [name, setName] = useState(userInfo.name)
  const [email, setEmail] = useState(userInfo.email)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    AOS.init()
    AOS.refresh()
    if (userInfo) {
      getUserSessions(userInfo.token, pageNumber)
    }
    return
  }, [userInfo, loading, activeItem, pageNumber])

  const handleSubmit = (e) => {
    e.preventDefault()

    const updatedUser = {
      name: name,
      email: email,
      password: password,
    }

    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      updateUser(updatedUser, userInfo.token)
      setMessage('Successfully updated')
    }
  }

  return (
    <>
      <Row>
        <Col className='d-flex justify-content-end'>
          <Link to='/' className='btn btn-primary btn-lg'>
            Go Back
          </Link>
        </Col>
      </Row>
      <Row>
        <Col md={3}>
          <Form onSubmit={handleSubmit} className='profile-form p-4 rounded'>
            <div className='mb-4'>
              <h3>Profile</h3>
            </div>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <br></br>
            <Form.Group controlId='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <br></br>
            <Form.Group controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter new password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <br></br>
            <Form.Group controlId='confirmPassword'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Confirm new password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>
            {message && <Alert>{message}</Alert>}

            <Button variant='primary' type='submit' className='mt-4' size='lg'>
              Update profile
            </Button>
          </Form>
        </Col>
        <Col className='user-session-list'>
          <Row>
            <h3>Your sessions</h3>
          </Row>
          <Row>
            {' '}
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
          </Row>
        </Col>

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
      </Row>
      <Row>
        <Col className='d-flex justify-content-end'>
          <Paginate pages={pages} page={page} path='/profile' />
        </Col>
      </Row>
    </>
  )
}

export default Profile
