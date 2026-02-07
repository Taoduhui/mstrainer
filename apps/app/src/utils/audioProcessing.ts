/**
 * Microphone Audio Processing Utilities
 * For pitch detection and note recognition
 */

export interface AudioConfig {
  sampleRate: number
  bufferSize: number
  minDecibels: number
}

export const defaultAudioConfig: AudioConfig = {
  sampleRate: 44100,
  bufferSize: 2048,
  minDecibels: -100,
}

/**
 * Request microphone access
 * @returns Promise with MediaStream
 */
export async function requestMicrophoneAccess(): Promise<MediaStream> {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true,
      },
    })
    return stream
  } catch (error) {
    console.error('Error accessing microphone:', error)
    throw new Error('Microphone access denied')
  }
}

/**
 * Detect pitch from audio data using autocorrelation
 * @param audioData Float32Array of audio samples
 * @param sampleRate Sample rate in Hz
 * @returns Detected frequency in Hz, or null if no pitch detected
 */
export function detectPitch(
  audioData: Float32Array,
  sampleRate: number
): number | null {
  // Autocorrelation method for pitch detection
  const bufferSize = audioData.length
  const correlations = new Array(bufferSize).fill(0)
  
  // Calculate autocorrelation
  for (let lag = 0; lag < bufferSize / 2; lag++) {
    let sum = 0
    for (let i = 0; i < bufferSize / 2; i++) {
      sum += audioData[i] * audioData[i + lag]
    }
    correlations[lag] = sum
  }
  
  // Find the first peak after the first zero crossing
  let maxCorrelation = -Infinity
  let maxLag = 0
  let foundZeroCrossing = false
  
  for (let lag = 1; lag < bufferSize / 2; lag++) {
    if (!foundZeroCrossing && correlations[lag] < 0) {
      foundZeroCrossing = true
    }
    
    if (foundZeroCrossing && correlations[lag] > maxCorrelation) {
      maxCorrelation = correlations[lag]
      maxLag = lag
    }
  }
  
  // Convert lag to frequency
  if (maxLag > 0 && maxCorrelation > 0.01) {
    const frequency = sampleRate / maxLag
    
    // Filter out unrealistic frequencies
    if (frequency >= 80 && frequency <= 2000) {
      return frequency
    }
  }
  
  return null
}

/**
 * Get the closest note to a given frequency
 * @param frequency Frequency in Hz
 * @returns Note name like "C4", "D#5"
 */
export function frequencyToNote(frequency: number): string {
  const A4 = 440
  const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
  
  const halfStepsFromA4 = Math.round(12 * Math.log2(frequency / A4))
  const octave = Math.floor((halfStepsFromA4 + 9) / 12) + 4
  const noteIndex = (halfStepsFromA4 + 9 + 120) % 12
  
  return `${noteNames[noteIndex]}${octave}`
}

/**
 * Calculate how close a detected frequency is to a target frequency
 * @param detected Detected frequency in Hz
 * @param target Target frequency in Hz
 * @returns Accuracy score from 0 to 1
 */
export function calculatePitchAccuracy(detected: number, target: number): number {
  const centsDifference = Math.abs(1200 * Math.log2(detected / target))
  
  // Perfect within 10 cents, acceptable within 50 cents
  if (centsDifference <= 10) return 1.0
  if (centsDifference >= 50) return 0.0
  
  return 1.0 - (centsDifference - 10) / 40
}
