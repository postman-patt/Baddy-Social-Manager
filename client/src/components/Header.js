import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Header = () => {
  return (
    <header>
      <Container>
        <Row className='justify-content-md-center text-center py-5'>
          <Col>
            <h1>Baddy Social Manager</h1>
          </Col>
        </Row>
      </Container>
    </header>
  )
}

export default Header
