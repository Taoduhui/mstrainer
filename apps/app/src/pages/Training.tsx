import { useState, useEffect } from 'react'
import './Training.css'

interface TrainingNote {
  id: string
  note: string
  octave: number
  nextReview: Date
  strength: number
}

function Training() {
  const [currentNote, setCurrentNote] = useState<TrainingNote | null>(null)
  const [isListening, setIsListening] = useState(false)
  const [feedback, setFeedback] = useState<string>('')
  const [stats, setStats] = useState({
    total: 0,
    correct: 0,
    streak: 0,
  })

  const startListening = () => {
    setIsListening(true)
    setFeedback('Listening... Play the note!')
    
    // Simulate note recognition
    setTimeout(() => {
      const isCorrect = Math.random() > 0.3
      setIsListening(false)
      
      if (isCorrect) {
        setFeedback('✓ Correct! Great job!')
        setStats(prev => ({
          total: prev.total + 1,
          correct: prev.correct + 1,
          streak: prev.streak + 1,
        }))
      } else {
        setFeedback('✗ Try again. Listen carefully and match the pitch.')
        setStats(prev => ({
          total: prev.total + 1,
          correct: prev.correct,
          streak: 0,
        }))
      }
      
      // Load next note after delay
      setTimeout(() => {
        loadNextNote()
        setFeedback('')
      }, 2000)
    }, 2000)
  }

  const loadNextNote = () => {
    const notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B']
    const note = notes[Math.floor(Math.random() * notes.length)]
    const octave = Math.floor(Math.random() * 3) + 3
    
    setCurrentNote({
      id: Math.random().toString(36).substr(2, 9),
      note,
      octave,
      nextReview: new Date(),
      strength: Math.random(),
    })
  }

  useEffect(() => {
    loadNextNote()
  }, [])

  const accuracy = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0

  return (
    <div className="training">
      <h1>Training Session</h1>
      <p className="page-description">
        Practice notes with microphone input. The system will listen and provide feedback.
      </p>

      <div className="stats-bar">
        <div className="stat">
          <span className="stat-label">Accuracy</span>
          <span className="stat-value">{accuracy}%</span>
        </div>
        <div className="stat">
          <span className="stat-label">Streak</span>
          <span className="stat-value">{stats.streak}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Total</span>
          <span className="stat-value">{stats.total}</span>
        </div>
      </div>

      {currentNote && (
        <div className="training-area">
          <div className="note-display">
            <div className="note-text">
              {currentNote.note}
              <sub>{currentNote.octave}</sub>
            </div>
            <div className="strength-bar">
              <div 
                className="strength-fill"
                style={{ width: `${currentNote.strength * 100}%` }}
              />
            </div>
          </div>

          {feedback && (
            <div className={`feedback ${feedback.startsWith('✓') ? 'success' : feedback.startsWith('✗') ? 'error' : ''}`}>
              {feedback}
            </div>
          )}

          <button 
            className="practice-button"
            onClick={startListening}
            disabled={isListening}
          >
            {isListening ? '🎤 Listening...' : '🎤 Start Practice'}
          </button>

          <div className="help-section">
            <h3>Training Tips</h3>
            <ul>
              <li>Make sure your microphone is enabled</li>
              <li>Play the displayed note on your instrument</li>
              <li>Notes are scheduled based on the forgetting curve</li>
              <li>Review strength increases with correct answers</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default Training
