import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row className='justify-content-md-center text-center py-5'>
          <Col>
            <p>Copyright &copy; 2021</p>
            <p>Created by Patrick Vuong</p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
