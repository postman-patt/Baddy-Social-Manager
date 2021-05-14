import React, { useState, useEffect, useContext } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { GlobalContext } from '../context/GlobalState'
import { Link } from 'react-router-dom'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
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

    registerUser(newUser)

    if (!error) {
      setMessage('Congratulations you have succeccfully registered!')
      setName('')
      setEmail('')
      setPassword('')
      setregisterSuccess('true')
    } else {
      setErrorMessage(error)
    }
  }
  return (
    <FormContainer>
      {!registerSuccess ? (
        <Form onSubmit={submitHandler}>
          <h1>Registration</h1>
          <br></br>
          {errorMessage && <Message variant='danger'>{errorMessage}</Message>}
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
          <Button type='submit' size='lg' variant='success'>
            Register
          </Button>
        </Form>
      ) : (
        <div className='justify-content-md-center text-center'>
          <i className='far fa-check-circle'></i>
          <br></br>
          <br></br>
          <h1>{message}</h1>
          <br></br>
          <br></br>
          <Link to='/'>Login to browse sessions</Link>
        </div>
      )}
    </FormContainer>
  )
}

export default Register
