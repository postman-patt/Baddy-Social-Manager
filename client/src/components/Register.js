import React, { useState, useContext } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { GlobalContext } from '../context/GlobalState'
import { Link } from 'react-router-dom'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [registerSuccess, setregisterSuccess] = useState(false)

  const { registerUser, error } = useContext(GlobalContext)

  const submitHandler = (e) => {
    e.preventDefault()

    const newUser = {
      name: name,
      email: email,
      password: password,
    }

    if (
      confirmPassword !== password ||
      email.length === 0 ||
      password.length < 8 ||
      name.length === 0
    ) {
      setMessage([
        'Name, email and password fields are populated',
        'Password is at least 8 characters long',
        'Passwords must match',
      ])
    } else {
      registerUser(newUser)
      if (!error) {
        setMessage(['Congratulations you have succeccfully registered!'])
        setName('')
        setEmail('')
        setPassword('')
        setregisterSuccess('true')
      } else {
        setErrorMessage(error)
      }
    }
  }
  return (
    <FormContainer mdsize={4}>
      {!registerSuccess ? (
        <Form
          onSubmit={submitHandler}
          className='sign-up-form'
          data-aos='fade-up'
          data-aos-duration='1000'
          data-aos-delay='700'
        >
          <h2>Sign Up!</h2>
          <br></br>
          {errorMessage && <Message variant='danger'>{errorMessage}</Message>}
          {message.length > 0 && (
            <Message variant='danger'>
              <p>Please ensure that:</p>
              <ul>
                {message.map((m) => (
                  <li>{m}</li>
                ))}
              </ul>
            </Message>
          )}
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
              placeholder='Enter Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <br></br>
          <Form.Group controlId='confirmPassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirm password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
          <br></br>
          <br></br>
          <Row>
            <Col>
              <Button type='submit' size='lg' variant='success'>
                Register
              </Button>
            </Col>
            <Col className='d-flex justify-content-end align-items-end'>
              <Link to='/'>Go Back</Link>
            </Col>
          </Row>
        </Form>
      ) : (
        <>
          <Row
            className='justify-content-md-center text-center mb-5'
            data-aos='zoom-out-right'
            data-aos-duration='1000'
            data-aos-delay='700'
          >
            <i className='far fa-check-circle'></i>
          </Row>
          <Row
            className='justify-content-md-center text-center sign-up-success my-3'
            data-aos='zoom-out-right'
            data-aos-duration='1000'
            data-aos-delay='700'
          >
            <h1>Congratulations you have succeccfully registered!</h1>
          </Row>
          <Row className='justify-content-md-center text-center'>
            <Link to='/'>Login to browse sessions</Link>
          </Row>
        </>
      )}
    </FormContainer>
  )
}

export default Register
