import './App.css'
import Header from './components/Header'
import SessionList from './components/SessionList'
import Register from './components/Register'
import Profile from './components/Profile'
import { Container } from 'react-bootstrap'
import { GlobalProvider } from './context/GlobalState'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Footer from './components/Footer'

function App() {
  return (
    <section>
      <GlobalProvider>
        <Router>
          <Container className='align-middle'>
            <Header />
            <Route path='/' exact component={SessionList} />
            <Route path='/page/:pageNumber' exact component={SessionList} />
            <Route path='/register' exact component={Register} />
            <Route path='/profile/page/:pageNumber' exact component={Profile} />
            <Footer />
          </Container>
        </Router>
      </GlobalProvider>
    </section>
  )
}

export default App
