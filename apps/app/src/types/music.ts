/**
 * Types for sheet music and note processing
 */

export interface Note {
  pitch: string // e.g., "C", "D", "E", "F", "G", "A", "B"
  octave: number // e.g., 4, 5, 6
  duration: number // in beats
  accidental?: 'sharp' | 'flat' | 'natural'
}

export interface Measure {
  notes: Note[]
  timeSignature: {
    beats: number
    beatType: number
  }
}

export interface SheetMusicData {
  id: string
  title: string
  composer?: string
  measures: Measure[]
  key: string
  tempo?: number
}

/**
 * Parse note string to Note object
 * @param noteString String like "C4", "D#5", "Eb3"
 * @returns Note object
 */
export function parseNote(noteString: string): Note {
  const match = noteString.match(/^([A-G])([#b]?)(\d+)$/)
  if (!match) {
    throw new Error(`Invalid note string: ${noteString}`)
  }

  const [, pitch, accidental, octave] = match
  
  return {
    pitch,
    octave: parseInt(octave, 10),
    duration: 1, // Default duration
    accidental: accidental === '#' ? 'sharp' : accidental === 'b' ? 'flat' : undefined,
  }
}

/**
 * Convert Note to string representation
 * @param note Note object
 * @returns String like "C4", "D#5"
 */
export function noteToString(note: Note): string {
  const accidental = note.accidental === 'sharp' ? '#' : note.accidental === 'flat' ? 'b' : ''
  return `${note.pitch}${accidental}${note.octave}`
}

/**
 * Extract all unique notes from sheet music
 * @param sheetMusic Sheet music data
 * @returns Array of unique notes
 */
export function extractUniqueNotes(sheetMusic: SheetMusicData): Note[] {
  const notesMap = new Map<string, Note>()
  
  for (const measure of sheetMusic.measures) {
    for (const note of measure.notes) {
      const key = noteToString(note)
      if (!notesMap.has(key)) {
        notesMap.set(key, note)
      }
    }
  }
  
  return Array.from(notesMap.values())
}

/**
 * Get note frequency in Hz
 * @param note Note object
 * @returns Frequency in Hz
 */
export function getNoteFrequency(note: Note): number {
  const A4 = 440 // Hz
  const noteValues: Record<string, number> = {
    'C': -9,
    'C#': -8,
    'Db': -8,
    'D': -7,
    'D#': -6,
    'Eb': -6,
    'E': -5,
    'F': -4,
    'F#': -3,
    'Gb': -3,
    'G': -2,
    'G#': -1,
    'Ab': -1,
    'A': 0,
    'A#': 1,
    'Bb': 1,
    'B': 2,
  }
  
  const noteString = noteToString(note)
  const baseNote = noteString.replace(/\d+$/, '')
  const semitonesFromA4 = noteValues[baseNote] + (note.octave - 4) * 12
  
  return A4 * Math.pow(2, semitonesFromA4 / 12)
}
