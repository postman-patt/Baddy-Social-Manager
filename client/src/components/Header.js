import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Header = () => {
  return (
    <Container>
      <Row
        className='justify-content-md-center text-center py-3 heading'
        data-aos='fade-up'
        data-aos-duration='1000'
        data-aos-offset='500'
        data-aos-delay='700'
      >
        <Col md={2} className='my-auto'>
          <img
            src='../../assets/man-playing-badminton.png'
            alt='man playing badminton'
            width='100%'
          />
        </Col>
        <Col md={10} className='my-auto'>
          <h1>Badminton Social Manager</h1>
        </Col>
      </Row>
    </Container>
  )
}

export default Header
