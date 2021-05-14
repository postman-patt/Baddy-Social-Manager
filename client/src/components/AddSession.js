import React from 'react'
import { useState, useEffect } from 'react'
import { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'
import { Form, Button, Alert, Col } from 'react-bootstrap'

const AddSession = ({ handleClose }) => {
  const [location, setLocation] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [cost, setCost] = useState(0)
  const [notes, setNotes] = useState('')
  const [message, setMessage] = useState('')

  const { addSession, error, userInfo } = useContext(GlobalContext)

  const handleSubmit = (e) => {
    e.preventDefault()

    const newSession = {
      host: userInfo._id,
      location: location,
      date: date,
      time: time,
      cost: cost,
      notes: notes,
    }

    addSession(newSession, userInfo.token)

    if (!error) {
      setLocation('')
      setDate('')
      setTime('')
      setCost('')
      setNotes('')
    } else {
      setMessage('Something went horribly wrong')
    }
  }
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='projectTitle'>
          <Form.Label>Location</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Project Title'
            onChange={(e) => setLocation(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId='projectTitle'>
          <Form.Label>Date</Form.Label>
          <Form.Control
            type='Date'
            placeholder='Enter Date'
            onChange={(e) => setDate(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId='projectTitle'>
          <Form.Label>Time</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Time'
            onChange={(e) => setTime(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId='projectTitle'>
          <Form.Label>Total Cost</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Total Cost'
            onChange={(e) => setCost(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId='projectTitle'>
          <Form.Label>Additional Notes</Form.Label>
          <Form.Control
            type='textarea'
            placeholder='Add Notes'
            onChange={(e) => setNotes(e.target.value)}
          />
        </Form.Group>
        <br></br>
        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
      {message && (
        <Alert className='my-3' variant='danger'>
          {message}
        </Alert>
      )}
      <br></br>
    </>
  )
}

export default AddSession
