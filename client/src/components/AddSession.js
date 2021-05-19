import React from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'
import { Form, Button, Alert } from 'react-bootstrap'

const AddSession = ({ handleClose }) => {
  const [location, setLocation] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [totalCosts, setTotalCosts] = useState(0)
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
      totalCosts: totalCosts,
      notes: notes,
    }

    addSession(newSession, userInfo.token)

    if (!error) {
      setLocation('')
      setDate('')
      setTime('')
      setTotalCosts('')
      setNotes('')
    } else {
      setMessage('Something went horribly wrong')
    }
  }
  return (
    <>
      <Form onSubmit={handleSubmit} className='add-session'>
        <Form.Group controlId='location'>
          <Form.Label>Location</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Location'
            onChange={(e) => setLocation(e.target.value)}
          />
        </Form.Group>
        <br></br>
        <Form.Group controlId='date'>
          <Form.Label>Date</Form.Label>
          <Form.Control
            type='Date'
            placeholder='Enter Date'
            onChange={(e) => setDate(e.target.value)}
          />
        </Form.Group>
        <br></br>
        <Form.Group controlId='time'>
          <Form.Label>Time</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Time'
            onChange={(e) => setTime(e.target.value)}
          />
        </Form.Group>
        <br></br>
        <Form.Group controlId='totalCosts'>
          <Form.Label>Total Cost</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Total Cost'
            onChange={(e) => setTotalCosts(e.target.value)}
          />
        </Form.Group>
        <br></br>
        <Form.Group controlId='notes'>
          <Form.Label>Additional Notes</Form.Label>
          <Form.Control
            as='textarea'
            rows={3}
            placeholder='Add Notes'
            onChange={(e) => setNotes(e.target.value)}
          />
        </Form.Group>
        <br></br>
        <br></br>
        <Button size='md' variant='primary' type='submit'>
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
