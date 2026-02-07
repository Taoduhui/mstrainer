import { useState } from 'react'
import './SheetMusic.css'

interface SheetMusicFile {
  id: string
  name: string
  uploadedAt: Date
  noteCount: number
}

function SheetMusic() {
  const [files, setFiles] = useState<SheetMusicFile[]>([])
  const [uploading, setUploading] = useState(false)

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploading(true)
    
    // Simulate file processing
    setTimeout(() => {
      const newFile: SheetMusicFile = {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        uploadedAt: new Date(),
        noteCount: Math.floor(Math.random() * 500) + 100, // Placeholder
      }
      
      setFiles([...files, newFile])
      setUploading(false)
    }, 1500)
  }

  const handleDelete = (id: string) => {
    setFiles(files.filter(f => f.id !== id))
  }

  return (
    <div className="sheet-music">
      <h1>Sheet Music Library</h1>
      <p className="page-description">
        Import your sheet music files (MSCZ format) to extract notes for training.
      </p>

      <div className="upload-section">
        <label className="upload-button" htmlFor="file-upload">
          {uploading ? 'Uploading...' : '+ Upload Sheet Music'}
        </label>
        <input
          id="file-upload"
          type="file"
          accept=".mscz,.musicxml,.xml"
          onChange={handleFileUpload}
          disabled={uploading}
          style={{ display: 'none' }}
        />
      </div>

      {files.length === 0 ? (
        <div className="empty-state">
          <p>No sheet music files uploaded yet.</p>
          <p className="help-text">Upload an MSCZ file to get started.</p>
        </div>
      ) : (
        <div className="files-list">
          {files.map(file => (
            <div key={file.id} className="file-card">
              <div className="file-info">
                <h3>{file.name}</h3>
                <p className="file-meta">
                  {file.noteCount} notes • Uploaded {file.uploadedAt.toLocaleDateString()}
                </p>
              </div>
              <div className="file-actions">
                <button className="action-button">Train</button>
                <button 
                  className="action-button delete"
                  onClick={() => handleDelete(file.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SheetMusic
