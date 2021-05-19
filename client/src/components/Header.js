import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Header = () => {
  return (
    <Container>
      <Row
        className='justify-content-md-center text-center py-5 heading'
        data-aos='fade-up'
        data-aos-duration='1000'
        data-aos-offset='500'
        data-aos-delay='700'
      >
        <Col>
          <h1>
            <span>
              <i className='fas fa-people-arrows'> </i>
            </span>
            Baddy Social Manager
          </h1>
        </Col>
      </Row>
    </Container>
  )
}

export default Header
