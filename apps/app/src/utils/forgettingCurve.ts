/**
 * Forgetting Curve Algorithm Implementation
 * Based on the Ebbinghaus forgetting curve and spaced repetition
 */

export interface ReviewItem {
  id: string
  strength: number // 0-1, where 1 is fully memorized
  lastReviewed: Date
  nextReview: Date
  reviewCount: number
  correctStreak: number
}

/**
 * Calculate when the next review should occur based on current strength
 * @param strength Current memory strength (0-1)
 * @param correctStreak Number of consecutive correct answers
 * @returns Interval in milliseconds until next review
 */
export function calculateNextReviewInterval(
  strength: number,
  correctStreak: number
): number {
  // Base intervals in milliseconds
  const baseIntervals = [
    5 * 60 * 1000,      // 5 minutes
    30 * 60 * 1000,     // 30 minutes
    12 * 60 * 60 * 1000, // 12 hours
    24 * 60 * 60 * 1000, // 1 day
    3 * 24 * 60 * 60 * 1000, // 3 days
    7 * 24 * 60 * 60 * 1000, // 1 week
    14 * 24 * 60 * 60 * 1000, // 2 weeks
    30 * 24 * 60 * 60 * 1000, // 1 month
  ]

  const index = Math.min(correctStreak, baseIntervals.length - 1)
  const baseInterval = baseIntervals[index]
  
  // Adjust based on strength
  const adjustedInterval = baseInterval * (0.5 + strength * 0.5)
  
  return adjustedInterval
}

/**
 * Update review item after a practice session
 * @param item Current review item
 * @param correct Whether the answer was correct
 * @returns Updated review item
 */
export function updateReviewItem(
  item: ReviewItem,
  correct: boolean
): ReviewItem {
  const now = new Date()
  
  if (correct) {
    // Increase strength
    const newStrength = Math.min(1, item.strength + 0.1)
    const newStreak = item.correctStreak + 1
    const nextInterval = calculateNextReviewInterval(newStrength, newStreak)
    
    return {
      ...item,
      strength: newStrength,
      lastReviewed: now,
      nextReview: new Date(now.getTime() + nextInterval),
      reviewCount: item.reviewCount + 1,
      correctStreak: newStreak,
    }
  } else {
    // Decrease strength and reset streak
    const newStrength = Math.max(0, item.strength - 0.2)
    const nextInterval = calculateNextReviewInterval(newStrength, 0)
    
    return {
      ...item,
      strength: newStrength,
      lastReviewed: now,
      nextReview: new Date(now.getTime() + nextInterval),
      reviewCount: item.reviewCount + 1,
      correctStreak: 0,
    }
  }
}

/**
 * Get items that are due for review
 * @param items All review items
 * @returns Items that should be reviewed now
 */
export function getDueItems(items: ReviewItem[]): ReviewItem[] {
  const now = new Date()
  return items
    .filter(item => item.nextReview <= now)
    .sort((a, b) => a.nextReview.getTime() - b.nextReview.getTime())
}

/**
 * Initialize a new review item
 * @param id Unique identifier
 * @returns New review item with default values
 */
export function createReviewItem(id: string): ReviewItem {
  const now = new Date()
  return {
    id,
    strength: 0,
    lastReviewed: now,
    nextReview: now,
    reviewCount: 0,
    correctStreak: 0,
  }
}
