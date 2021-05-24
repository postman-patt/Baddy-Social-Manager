import React from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'
import { Form, Button, Alert, Row, Col } from 'react-bootstrap'
import FormContainer from './FormContainer'
import moment from 'moment'

const AddSession = ({ handleClose }) => {
  const [location, setLocation] = useState('')
  const [date, setDate] = useState('')
  const [FromTime, setFromTime] = useState('')
  const [ToTime, setToTime] = useState('')
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
      time: `${FromTime} - ${ToTime}`,
      totalCosts: totalCosts,
      notes: notes,
    }

    console.log(newSession)
    addSession(newSession, userInfo.token)

    if (!error) {
      setLocation('')
      setDate('')
      setTotalCosts('')
      setNotes('')
    } else {
      setMessage('Something went horribly wrong')
    }
  }
  return (
    <FormContainer>
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
          <Row>
            <Col
              lg={1}
              className='d-flex justify-content-center align-self-center'
            >
              <i>Start</i>
            </Col>
            <Col>
              <Form.Control
                type='time'
                onChange={(e) =>
                  setFromTime(
                    moment(e.target.value, 'HH:mm:ss').format('hh:mm A')
                  )
                }
              />
            </Col>
            <Col
              md={1}
              className='d-flex justify-content-center align-self-center'
            >
              <i>End</i>
            </Col>
            <Col>
              <Form.Control
                type='time'
                onChange={(e) =>
                  setToTime(
                    moment(e.target.value, 'HH:mm:ss').format('hh:mm A')
                  )
                }
              />
            </Col>
          </Row>
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
            placeholder='Add notes...'
            onChange={(e) => setNotes(e.target.value)}
          />
        </Form.Group>

        <Row className='d-flex justify-content-center'>
          <Button size='lg' variant='primary' type='submit' className='mt-5'>
            Submit
          </Button>
        </Row>
      </Form>
      {message && (
        <Alert className='my-3' variant='danger'>
          {message}
        </Alert>
      )}
      <br></br>
    </FormContainer>
  )
}

export default AddSession
