import './Home.css'

function Home() {
  return (
    <div className="home">
      <div className="hero">
        <h1>MS Trainer</h1>
        <p className="subtitle">Instrument Training Software with Smart Learning</p>
        <p className="description">
          Master your instrument with our intelligent training system. Import sheet music,
          practice with spaced repetition based on the forgetting curve, and track your progress.
        </p>
      </div>

      <div className="features">
        <div className="feature-card">
          <h2>📄 Sheet Music Import</h2>
          <p>
            Import and manage your sheet music in MSCZ format. Our system automatically
            extracts notes and prepares them for training.
          </p>
        </div>

        <div className="feature-card">
          <h2>🎯 Smart Training</h2>
          <p>
            Train efficiently with our forgetting curve-based algorithm. Focus on what
            you need to practice most, when you need to practice it.
          </p>
        </div>

        <div className="feature-card">
          <h2>🎤 Performance Recognition</h2>
          <p>
            Use your microphone to play notes and get instant feedback on your
            performance. Track accuracy and improve over time.
          </p>
        </div>

        <div className="feature-card">
          <h2>📊 Progress Tracking</h2>
          <p>
            Monitor your learning progress with detailed statistics and insights.
            See which pieces you've mastered and which need more practice.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Home
