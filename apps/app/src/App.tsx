import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Training from './pages/Training'
import SheetMusic from './pages/SheetMusic'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="nav">
          <div className="nav-container">
            <Link to="/" className="nav-logo">
              MS Trainer
            </Link>
            <ul className="nav-menu">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/sheet-music" className="nav-link">
                  Sheet Music
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/training" className="nav-link">
                  Training
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sheet-music" element={<SheetMusic />} />
            <Route path="/training" element={<Training />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
