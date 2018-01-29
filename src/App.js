import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import Projects from './scenes/Projects'
import './App.css'

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)

const ProjectsScene = () => (
  <div>
    <Projects />
  </div>
)

const App = () => (
  <Router>
    <div>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/projects'>ProjectsScene</Link></li>
      </ul>

      <hr />

      <Route exact path='/' component={Home} />
      <Route path='/projects' component={ProjectsScene} />
    </div>
  </Router>
)

export default App
